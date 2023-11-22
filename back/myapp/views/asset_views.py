from myapp.forms import asset_forms
from myapp.services import asset_svc
from myapp.serializers import asset_serializers
from django.http import JsonResponse
import json


def asset(request):
    if request.method == "GET":
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        # filtered_assets = asset_forms.AssetForm.model_validate(request.GET.dict())
        assets_query = asset_svc.get_assets()
        # assets = asset_serializers.get_assets(assets_query)

        return JsonResponse(assets_query, safe=False)
    elif request.method == "POST":
        # params = asset_forms.Post.model_validate(json.loads(request.body)["params"])
        # asset_svc.post_asset(
        #     params.name, params.periodicity, params.max_value, params.min_value, params.user_id
        # )
        asset_svc.post_asset(
            "5GTK11", 1, 3, 2, 1
        )

        return JsonResponse({}, safe=False)
