from myapp.models import Asset


def asset(ids):
    if ids:
        assets = Asset.objects.filter(id__in=ids, cur_value__isnull=False)
    else:
        assets = Asset.objects.filter(cur_value__isnull=False)

    return assets
