from myapp.models import Asset, PriceFunnel
from django.core.exceptions import ObjectDoesNotExist, ValidationError


def get_funnels(id, name, user_id):
    if id:
        try:
            funnel = PriceFunnel.objects.get(id=id)
            return [funnel]
        except ObjectDoesNotExist:
            raise ValidationError("O ativo de id {id} não existe")
    elif name:
        try:
            funnel = PriceFunnel.objects.get(name=name)
            return [funnel]
        except ObjectDoesNotExist:
            raise ValidationError("O ativo de nome {name} não existe")
    else:
        funnels = PriceFunnel.objects.filter(user_id=user_id, active=True)
        return funnels
    

def post_funnel(name, periodicity, max_value, min_value, user_id):
    asset = Asset.objects.get(name=name)
    try:
        # Desta forma não preciso colocar uma constraint "unique" no banco pra uma regra de negócio
        # que ainda não entendo o suficiente
        funnel = asset.pricefunnel_set.get(user_id=user_id)

        if funnel.active:
            raise ValidationError("O funil de preços já está cadastrado")
        else:
            funnel.active = True
            funnel.periodicity = periodicity
            funnel.max_value = max_value
            funnel.min_value = min_value
            funnel.save(update_fields=["active", "periodicity", "max_value", "min_value"])
    except ObjectDoesNotExist:
        funnel = PriceFunnel.objects.create(
            periodicity=periodicity,
            max_value=max_value,
            min_value=min_value,
            asset_id=asset.id,
            user_id=user_id,
        )

    return funnel


def remove_funnel(id):
    try:
        funnel = PriceFunnel.objects.get(id=id)
        funnel.active = False
        funnel.save(update_fields=["active"])
    except ObjectDoesNotExist:
        raise ValidationError("O ativo de id {id} não existe")
