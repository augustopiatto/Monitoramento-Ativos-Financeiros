from django.core.management.base import BaseCommand
from myapp.services.external.external_asset import asset_list
from django.utils import timezone
from myapp.models import Asset, User, PriceFunnel


class Command(BaseCommand):
    help = "Preenche o banco local com informações para usar o aplicativo"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        now = timezone.now()
        augusto_user, pedro_user = create_users()
        create_assets(now)
        create_funnels(augusto_user, pedro_user, now)

        self.stdout.write(
            self.style.SUCCESS("O banco foi populado com informações iniciais!")
        )


def create_users():
    existing_users = User.objects.all()
    if existing_users.exists():
        return existing_users[0], existing_users[1]
    else:
        augusto_user = User.objects.create(name="Augusto", email="example1@example.com")
        pedro_user = User.objects.create(name="Pedro", email="example2@example.com")
        return augusto_user, pedro_user


def create_assets(now):
    existing_assets = Asset.objects.all().exists()
    if existing_assets:
        pass
    else:
        assets = asset_list()

        assets_to_create = []
        for asset in assets:
            new_asset = Asset(name=asset["name"], cur_value=asset["cur_value"], last_updated=now)
            assets_to_create.append(new_asset)

        Asset.objects.bulk_create(assets_to_create, batch_size=500)


def create_funnels(augusto_user, pedro_user, now):
    existing_funnels = PriceFunnel.objects.all().exists()
    if existing_funnels:
        pass
    else:
        # Asset 1 sendo visto de 1 em 1 min. O usuário consegue ver esse funil na tela
        PriceFunnel.objects.create(
            periodicity=1,
            max_value=2,
            min_value=1,
            asset_id=1,
            user=augusto_user,
            last_updated=now
        )
        # Asset 1 sendo visto de 2 em 2 min. O usuário NÃO consegue ver esse funil na tela
        PriceFunnel.objects.create(
            periodicity=2,
            max_value=2000,
            min_value=1000,
            asset_id=1,
            user=pedro_user,
            last_updated=now
        )
        PriceFunnel.objects.create(
            periodicity=1,
            max_value=220,
            min_value=150,
            asset_id=2,
            user=augusto_user,
            last_updated=now
        )
