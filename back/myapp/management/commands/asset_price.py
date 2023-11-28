from myapp.models import Asset
from django.core.management.base import BaseCommand
from django.db.models import Q, F, ExpressionWrapper, fields, Case, When, Value, Func
from django.utils import timezone
from myapp.services.external_asset_svc import asset_list


BASE_URL = "https://brapi.dev/api/"
now = timezone.now()


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

        assets_to_update = get_assets_to_update()
        update_assets(assets_to_update)

        print("assets_to_update", assets_to_update)
        print("Comando 'asset_price' rodou!")


def get_assets_to_update():
    class DurationToMinutes(Func):
        function = "EXTRACT"
        template = "%(function)s(EPOCH FROM %(expressions)s) / 60"

    assets_to_update = Asset.objects.annotate(
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
    ).filter(Q(last_updated__isnull=True) | Q(periodicity__lte=F("time_diff_minutes")))

    return assets_to_update


def update_assets(assets):
    all_assets = asset_list()

    assets_to_update = []
    for asset_obj in assets:
        asset_api = next((asset for asset in all_assets if asset["stock"] == asset_obj.name), None)

        if asset_api:
            #: API retorna um numero com ponto separando as casas decimais. O Python lida com isso.
            asset_obj.cur_value = asset_api["close"]
            asset_obj.last_updated = now
            assets_to_update.append(asset_obj)

    Asset.objects.bulk_update(assets_to_update, ["cur_value", "last_updated"], batch_size=500)
