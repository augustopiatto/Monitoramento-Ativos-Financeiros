from myapp.forms import asset_forms
from myapp.services import asset_svc
from myapp.serializers import asset_serializers
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def asset(request):
    if request.method == "GET":
        params = asset_forms.GetAssetForm.model_validate({**request.GET})
        assets_query = asset_svc.get_assets(params.id, params.name)
        serialized_assets = [asset_serializers.asset(asset) for asset in assets_query]

        return JsonResponse(serialized_assets, safe=False)

    elif request.method == "POST":
        params = asset_forms.PostAssetForm.model_validate(json.loads(request.body)["params"])
        asset = asset_svc.post_asset(
            params.name, params.periodicity, params.max_value, params.min_value, params.user_id
        )
        serialized_asset = asset_serializers.asset(asset)

        return JsonResponse(serialized_asset, safe=False)


@csrf_exempt
def remove_asset(request):
    params = asset_forms.RemoveAssetForm.model_validate(json.loads(request.body)["params"])
    asset_svc.remove_asset(params.id)

    return JsonResponse({}, safe=False)

def asset_price(request):
    normalized_request = {"ids": {**request.GET}["ids[]"]}
    params = asset_forms.AssetPriceForm.model_validate(normalized_request)
    assets_query = asset_svc.asset_price(params.ids)
    serialized_assets = [asset_serializers.asset_price(asset) for asset in assets_query]

    return JsonResponse(serialized_assets, safe=False)
