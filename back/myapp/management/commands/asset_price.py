from myapp.models import Asset
from django.core.management.base import BaseCommand
from django.db.models import Q, F, ExpressionWrapper, fields, Case, When, Value, Func
from django.utils import timezone


class Command(BaseCommand):
    help = "Preenche os ativos com seu valor do momento atual"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        class DurationToMinutes(Func):
            function = 'EXTRACT'
            template = "%(function)s(EPOCH FROM %(expressions)s) / 60"

        # vou ter q pegar todos o assets do meu banco que tiverem o now() - last_updated >= periodicity
        # e buscar na api externa do brapi (talvez ver alguma diferente, que possa passar os nomes
        # e retornar só as que preciso)
        now = timezone.now()

        assets_to_update = Asset.objects.annotate(
            time_diff=Case(
                When(last_updated__isnull=False, then=ExpressionWrapper(
                    now - F('last_updated'),
                    output_field=fields.DurationField()
                )),
                default=Value(None),
                output_field=fields.DurationField()
            )
        ).annotate(
            time_diff_minutes=DurationToMinutes('time_diff')
        ).filter(Q(last_updated__isnull=True) | Q(periodicity__lte=F('time_diff_minutes')))

        print(assets_to_update)
        print("Comando 'asset_price' rodou!")
