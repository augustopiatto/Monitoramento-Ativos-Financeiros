from django.core.management.base import BaseCommand
from django.db.models import Q, F, ExpressionWrapper, fields, Func
from django.utils import timezone
from django.core.mail import send_mass_mail
from django.core.exceptions import ValidationError
from myapp.models import Asset, PriceFunnel
from myapp.services.external.external_asset import asset_list
from settings import EMAIL_HOST_USER



BASE_URL = "https://brapi.dev/api/"


class DurationToMinutes(Func):
    function = "CEIL"
    template = "%(function)s(EXTRACT(EPOCH FROM %(expressions)s)) / 60"


class Command(BaseCommand):
    help = "Preenche os ativos com seu valor do momento atual"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        now = timezone.now()
        assets_to_update = get_assets_to_update(now)

        assets_to_update_list = update_assets(assets_to_update, now)

        if EMAIL_HOST_USER:
            send_email(assets_to_update_list, now)

        self.stdout.write(
            self.style.SUCCESS("Comando rodou! %s ativo(s) atualizado(s)!" % len(assets_to_update_list))
        )


def get_assets_to_update(now):
    time_diff_expr = ExpressionWrapper(
        now - F("asset__last_updated"),
        output_field=fields.DurationField()
    )

    funnels_to_compare = PriceFunnel.objects.filter(
        Q(asset__last_updated__isnull=True) | 
        Q(periodicity__lte=DurationToMinutes(time_diff_expr)),
        active=True
    ).values("asset_id").distinct()

    asset_ids = [funnel['asset_id'] for funnel in funnels_to_compare]
    assets_to_update = Asset.objects.filter(id__in=asset_ids)

    return assets_to_update


def update_assets(assets_to_update, now):
    all_assets = asset_list()

    assets_to_update_list = []
    for asset_obj in assets_to_update:
        asset_api = [asset for asset in all_assets if asset["name"] == asset_obj.name]

        if asset_api:
            asset_api = asset_api[0]
            #: API retorna um numero com ponto separando as casas decimais. O Python lida com isso.
            current_value = asset_api["cur_value"]
            asset_obj.cur_value = current_value
            asset_obj.last_updated = now
            assets_to_update_list.append(asset_obj)

    Asset.objects.bulk_update(assets_to_update_list, ["cur_value", "last_updated"], batch_size=500)

    return assets_to_update_list


def send_email(assets_to_update_list, now):
    assets_to_update_ids = [asset.id for asset in assets_to_update_list]
    assets_to_email = {"buy": [], "sell": []}

    funnels_to_update = PriceFunnel.objects.filter(
        Q(last_updated__isnull=True) |
        Q(periodicity__lte=DurationToMinutes(now - F("last_updated"))), 
        active=True, 
        asset_id__in=assets_to_update_ids
    ).select_related('user')

    for asset in assets_to_update_list:
        relevant_funnels = [funnel for funnel in funnels_to_update if funnel.asset_id == asset.id]
        for funnel in relevant_funnels:
            if asset.cur_value < funnel.min_value:
                assets_to_email["buy"].append((asset.name, funnel.user.email))
            elif asset.cur_value > funnel.max_value:
                assets_to_email["sell"].append((asset.name, funnel.user.email))

    if assets_to_email["buy"] or assets_to_email["sell"]:
        try:
            buy_messages = [
                ("Compre o ativo %s" % asset_name,
                 "Seu ativo atingiu um preço abaixo do mínimo especificado por você. Compre-o agora!",
                 EMAIL_HOST_USER,
                 [email]
                ) for asset_name, email in assets_to_email["buy"]
            ]
            sell_messages = [
                ("Venda o ativo %s" % asset_name,
                 "Seu ativo atingiu um preço acima do máximo especificado por você. Venda-o agora!",
                 EMAIL_HOST_USER,
                 [email]) for asset_name, email in assets_to_email["sell"]
                ]
            send_mass_mail(buy_messages + sell_messages, fail_silently=False)
            funnels_to_update.update(last_updated=now)
        except Exception as error:
            print("%s", error)
            raise ValidationError("Houve um problema para enviar os e-mails. Verifique o que pode ter sido.")
