from back.template.views import asset_views
from back.template.models import Asset


def test_post_student_grade_view(db, rf, mocker):
    mocker.patch("back.template.services.asset_svc.get_assets", return_value=[])
    asset = Asset.objects.create(name="test")
    request = rf.get(
        "api/asset/",
        {"params": {"id": asset.id, "name": asset.name}},
        content_type="application/json"
    )
    response = asset_views.get_assets(request)

    assert response.status_code == 200
