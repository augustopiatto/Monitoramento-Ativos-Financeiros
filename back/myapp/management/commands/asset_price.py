from myapp.models import Asset
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Preenche os ativos com seu valor do momento atual"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        Asset.objects.filter(name="teste").update(periodicity=10)
