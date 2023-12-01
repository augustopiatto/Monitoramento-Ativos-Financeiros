from myapp.views import asset_views
import json


def test_get_assets_with_id(db, rf, mocker, asset_ABC, asset_DEF):
    mocker.patch("myapp.services.asset_svc.asset", return_value=[asset_ABC])
    request = rf.get("api/asset/", {"ids[]": [asset_ABC.id]})
    response = asset_views.asset(request)

    assert response.status_code == 200
    json_response = json.loads(response.content)
    assert len(json_response) == 1


def test_get_assets_without_id(db, rf, mocker, asset_ABC, asset_DEF):
    mocker.patch("myapp.services.asset_svc.asset", return_value=[asset_ABC, asset_DEF])
    request = rf.get("api/asset/", {})
    response = asset_views.asset(request)

    assert response.status_code == 200
    json_response = json.loads(response.content)
    assert len(json_response) == 2
