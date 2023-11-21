from myapp.forms import asset_forms
from myapp.services import asset_svc
from myapp.serializers import asset_serializers
from django.http import JsonResponse


def asset(request):
    if request.method == "GET":
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        # filtered_assets = asset_forms.AssetForm.model_validate(request.GET.dict())
        assets_query = asset_svc.get_assets()
        # assets = asset_serializers.get_assets(assets_query)

        return JsonResponse(assets_query, safe=False)
    elif request.method == "POST":
        return
