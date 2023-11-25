from myapp.forms import asset_forms
from myapp.services import asset_svc
from myapp.serializers import asset_serializers
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def asset(request):
    if request.method == "GET":
        filtered_asset = asset_forms.GetAssetForm.model_validate(request.GET.dict())
        assets_query = asset_svc.get_assets(filtered_asset.id, filtered_asset.name)
        assets = [asset_serializers.get_assets(asset) for asset in assets_query]

        return JsonResponse(assets, safe=False)

    elif request.method == "POST":
        params = asset_forms.PostAssetForm.model_validate(json.loads(request.body)["params"])
        asset_svc.post_asset(
            params.name, params.periodicity, params.max_value, params.min_value, params.user_id
        )

        return JsonResponse({}, safe=False)
