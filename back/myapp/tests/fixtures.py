from django.utils import timezone
from myapp.models import Asset
import pytest


now = timezone.now()


@pytest.fixture
def asset_ABC():
    return Asset.objects.create(name='ABC', cur_value=20, last_updated=now)


@pytest.fixture
def asset_DEF():
    return Asset.objects.create(name='DEF', cur_value=10, last_updated=now)
