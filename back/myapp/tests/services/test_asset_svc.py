from back.myapp.services import asset_svc
from back.myapp.forms.asset_forms import AssetForm
from back.myapp.models import Asset

def test_get_assets(db):
    asset = Asset.objects.create(name="test")
    form = AssetForm(id=asset.id, name=asset.name)
    assets = asset_svc.get_assets(form.name)

    assert len(assets) == 1
