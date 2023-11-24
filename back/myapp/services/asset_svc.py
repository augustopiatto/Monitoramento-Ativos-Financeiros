from myapp.models import Asset
from django.core.exceptions import ObjectDoesNotExist, ValidationError


def get_assets():
    return [
        { "name": "Petro", "periodicity": 120, "max_value": 200, "min_value": 100 },
        { "name": "Enel", "periodicity": 170, "max_value": 220, "min_value": 80 },
        { "name": "MWL", "periodicity": 60, "max_value": 50, "min_value": 10 },
        { "name": "B2W", "periodicity": 400, "max_value": 2000, "min_value": 500 },
        { "name": "Buser", "periodicity": 2000, "max_value": 145, "min_value": 140 },
    ]


def post_asset(name, periodicity, max_value, min_value, user_id):
    try:
        Asset.objects.get(name=name)
    except ObjectDoesNotExist:
        asset = Asset.objects.create(
            name=name,
            periodicity=periodicity,
            max_value=max_value,
            min_value=min_value,
        )
        asset.user_id.add(user_id)
        return 

    raise ValidationError("O ativo já está cadastrado")
