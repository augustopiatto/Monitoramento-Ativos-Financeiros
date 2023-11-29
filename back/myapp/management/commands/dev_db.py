from django.core.management.base import BaseCommand
from myapp.services.external.external_asset import asset_list
from django.utils import timezone
from myapp.models import Asset, User


class Command(BaseCommand):
    help = "Preenche o banco local com informações para usar o aplicativo"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        create_users()
        create_assets()


def create_users():
    existing_users = User.objects.all().exists()
    if existing_users:
        pass
    else:
        User.objects.create(name="Augusto", email="example1@example.com")
        User.objects.create(name="Pedro", email="example2@example.com")


def create_assets():
    existing_assets = Asset.objects.all().exists()
    if existing_assets:
        pass
    else:
        now = timezone.now()
        assets = asset_list()

        assets_to_create = []
        for asset in assets:
            new_asset = Asset(name=asset["name"], cur_value=asset["cur_value"], last_updated=now)
            assets_to_create.append(new_asset)

        Asset.objects.bulk_create(assets_to_create, batch_size=500)
