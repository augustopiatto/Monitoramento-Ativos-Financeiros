
from myapp.services import external_asset_svc
from myapp.serializers import external_asset_serializers
from django.http import JsonResponse


def asset_list(request):
    assets_query = external_asset_svc.asset_list()
    serialized_assets = [external_asset_serializers.asset_list(obj) for obj in assets_query]

    return JsonResponse(serialized_assets, safe=False)
