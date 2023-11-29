from django.http import JsonResponse
from myapp.forms import asset_forms
from myapp.services import asset_svc
from myapp.serializers import asset_serializers


def asset(request):
    normalized_request = {"ids": {**request.GET}["ids[]"]} if {**request.GET}.get("ids[]") else {}
    params = asset_forms.AssetForm.model_validate(normalized_request)
    assets_query = asset_svc.asset(params.ids)
    serialized_assets = [asset_serializers.asset(asset) for asset in assets_query]

    return JsonResponse(serialized_assets, safe=False)
