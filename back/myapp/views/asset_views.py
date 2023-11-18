from back.template.forms import asset_forms
from back.template.services import asset_svc
from back.template.serializers import asset_serializers


def asset(request):
    if request.method == "GET":
        filtered_assets = asset_forms.AssetForm.model_validate(request.GET.dict())
        assets_query = asset_svc.get_assets(filtered_assets)
        assets = asset_serializers.get_assets(assets_query)

        return assets
    elif request.method == "POST":
        return
