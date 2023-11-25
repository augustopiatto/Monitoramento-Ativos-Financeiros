from myapp.models import Asset
from django.core.exceptions import ObjectDoesNotExist, ValidationError


def get_assets(id, name):
    if id:
        try:
            asset = Asset.objects.get(id=id)
            return [asset]
        except ObjectDoesNotExist:
            raise ValidationError("O ativo de id {id} não existe")
    elif name:
        try:
            asset = Asset.objects.get(name=name)
            return [asset]
        except ObjectDoesNotExist:
            raise ValidationError("O ativo de nome {name} não existe")
    else:
        assets = Asset.objects.all()
        return assets


def post_asset(name, periodicity, max_value, min_value, user_id):
    try:
        # Desta forma não preciso colocar uma constraint "unique" no banco pra uma regra de negócio
        # que ainda não entendo o suficiente
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
