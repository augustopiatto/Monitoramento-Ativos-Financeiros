from myapp.models import PriceFunnel
from django.core.exceptions import ObjectDoesNotExist, ValidationError


def get_funnels(id, name):
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
        funnels = PriceFunnel.objects.filter(active=True)
        return funnels
    

def post_funnel(name, periodicity, max_value, min_value, user_id):
    try:
        # Desta forma não preciso colocar uma constraint "unique" no banco pra uma regra de negócio
        # que ainda não entendo o suficiente
        asset = PriceFunnel.objects.get(name=name)
        if asset.active:
            raise ValidationError("O ativo já está cadastrado")
        else:
            asset.active = True
            asset.periodicity = periodicity
            asset.max_value = max_value
            asset.min_value = min_value
            asset.save(update_fields=["active", "periodicity", "max_value", "min_value"])
    except ObjectDoesNotExist:
        asset = PriceFunnel.objects.create(
            name=name,
            periodicity=periodicity,
            max_value=max_value,
            min_value=min_value,
        )
        asset.user_id.add(user_id)

    return asset


def remove_funnel(id):
    try:
        funnel = PriceFunnel.objects.get(id=id)
        funnel.active = False
        funnel.save(update_fields=["active"])
    except ObjectDoesNotExist:
        raise ValidationError("O ativo de id {id} não existe")
