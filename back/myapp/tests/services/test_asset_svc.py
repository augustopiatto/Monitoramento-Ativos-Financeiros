from myapp.services import asset_svc
from myapp.forms import asset_forms


def test_get_assets_with_id(db, asset_ABC, asset_DEF):
    data = {"ids[]": [asset_ABC.id]}
    form = asset_forms.AssetForm.model_validate(data)
    assets = asset_svc.asset(form.ids)

    assert len(assets) == 1


def test_get_assets_without_id(db, asset_ABC, asset_DEF):
    form = asset_forms.AssetForm(ids=[])
    assets = asset_svc.asset(form.ids)

    assert len(assets) == 2
