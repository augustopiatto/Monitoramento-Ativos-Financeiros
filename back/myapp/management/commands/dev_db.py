from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Preenche o banco local com informações para usar o aplicativo"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        pass
