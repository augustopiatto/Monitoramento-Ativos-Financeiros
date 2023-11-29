from django.http import JsonResponse
from myapp.forms import asset_forms
from myapp.services import asset_svc
from myapp.serializers import asset_serializers


def asset(request):
    params = asset_forms.AssetForm.model_validate(request.GET)
    assets_query = asset_svc.asset(params.ids)
    serialized_assets = [asset_serializers.asset(asset) for asset in assets_query]

    return JsonResponse(serialized_assets, safe=False)
