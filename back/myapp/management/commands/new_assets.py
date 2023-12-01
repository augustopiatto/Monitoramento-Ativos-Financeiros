from django.core.management.base import BaseCommand
from django.utils import timezone
from myapp.models import Asset
from myapp.services.external.external_asset import asset_list


class Command(BaseCommand):
    help = "Salva no banco novos ativos"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        now = timezone.now()
        api_assets = asset_list()

        existing_assets = Asset.objects.values_list("name", flat=True)
        existing_assets_name_list = list(existing_assets)

        assets_to_create = []
        for api_asset in api_assets:
            if api_asset["name"] not in existing_assets_name_list:
                new_asset = Asset(
                    name=api_asset["name"],
                    cur_value=api_asset["cur_value"],
                    last_updated=now
                )
                assets_to_create.append(new_asset)

        Asset.objects.bulk_create(assets_to_create, batch_size=500)

        self.stdout.write(
            self.style.SUCCESS("O comando de preencher novos ativos rodou! %s ativo(s) criados(s)!" % len(assets_to_create))
        )
