import requests
from settings import ASSETS_EXTERNAL_URL_API_KEY
from django.core.exceptions import ValidationError


BASE_URL = "https://brapi.dev/api/"


def asset_list():
    try:
        params = {
            "sortBy": "name",
            'sortOrder': 'asc',
        }
        url = BASE_URL + 'quote/list?token=%s' % ASSETS_EXTERNAL_URL_API_KEY
        response = requests.get(url, params=params)
    except:
        raise ValidationError("A requisição ao Brapi não foi bem sucedida")
    data = response.json()
    return data["stocks"]
