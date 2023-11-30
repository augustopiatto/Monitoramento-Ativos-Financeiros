from myapp.models import Asset, PriceFunnel
from django.core.management.base import BaseCommand
from django.db.models import Q, F, ExpressionWrapper, fields, Case, When, Value, Func, Subquery
from django.utils import timezone
from myapp.services.external.external_asset import asset_list
# from django.core.mail import send_mass_mail


BASE_URL = "https://brapi.dev/api/"
assets_to_email = {"buy": [], "sell": []}


class Command(BaseCommand):
    help = "Preenche os ativos com seu valor do momento atual"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        # Fluxo:

        # Vou ter q pegar todos o assets do meu banco que tiverem o now() - last_updated >= periodicity
        # e buscar na api externa do brapi (talvez ver alguma diferente, que possa passar os nomes
        # e retornar só as que preciso)

        # Atualizar os cur_value e last_updated destes assets

        # Comparar os cur_value com os limites de tunel max_value e min_value e
        # enviar e-mail de template "COMPRAR" ou "VENDER"

        print("Comando 'asset_price' começou!")

        now = timezone.now()
        assets_to_update = get_assets_to_update(now)
        print("assets_to_update", assets_to_update)
        assets_to_update_list = update_assets(assets_to_update, now)
        send_email(assets_to_update_list, now)

        print("Comando 'asset_price' rodou!")


def get_assets_to_update(now):
    class DurationToMinutes(Func):
        function = "CEIL"
        template = "%(function)s(EXTRACT(EPOCH FROM %(expressions)s)) / 60"

    funnels_to_compare = PriceFunnel.objects.annotate(
        time_diff=Case(
            When(asset__last_updated__isnull=False, then=ExpressionWrapper(
                now - F("asset__last_updated"),
                output_field=fields.DurationField()
            )),
            default=Value(None),
            output_field=fields.DurationField()
        )
    ).annotate(
        time_diff_minutes=DurationToMinutes("time_diff")
    ).filter(
        Q(asset__last_updated__isnull=True) | Q(periodicity__lte=F("time_diff_minutes")), active=True
    )

    assets_to_update = Asset.objects.filter(id__in=Subquery(funnels_to_compare.values("asset_id")))

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

    class DurationToMinutes(Func):
        function = "CEIL"
        template = "%(function)s(EXTRACT(EPOCH FROM %(expressions)s)) / 60"

    funnels_to_update = PriceFunnel.objects.annotate(
        time_diff=Case(
            When(last_updated__isnull=False, then=ExpressionWrapper(
                now - F("last_updated"),
                output_field=fields.DurationField()
            )),
            default=Value(None),
            output_field=fields.DurationField()
        )
    ).annotate(
        time_diff_minutes=DurationToMinutes("time_diff")
    ).filter(
        Q(last_updated__isnull=True) | Q(periodicity__lte=F("time_diff_minutes")), active=True, asset_id__in=assets_to_update_ids
    )

    for funnel in funnels_to_update:
        assets = [asset for asset in assets_to_update_list if asset.id == funnel.asset_id]
        for asset in assets:
            if asset.cur_value < funnel.min_value:
                assets_to_email["buy"].append((asset.name, funnel.user.email))
            elif asset.cur_value > funnel.max_value:
                assets_to_email["sell"].append((asset.name, funnel.user.email))

    if assets_to_email:
        # buy_message = (
        #     "Compre o ativo %s",
        #     "Seu ativo atingiu um preço abaixo do mínimo especificado por você. Compre-o agora!",
        #     "from@example.com",
        #     ["%s"],
        # )
        # sell_message = (
        #     "Venda o ativo %s",
        #     "Seu ativo atingiu um preço acima do máximo especificado por você. Venda-o agora!",
        #     "from@example.com",
        #     ["%s"],
        # )
        # send_mass_mail((buy_message, sell_message), fail_silently=False)
        return
