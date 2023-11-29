import requests
from settings import ASSETS_EXTERNAL_URL_API_KEY
from django.core.exceptions import ValidationError
from myapp.serializers import external_asset_serializers


BASE_URL = "https://brapi.dev/api/"
GENERIC_ERROR_MESSAGE = "A requisição ao Brapi não foi bem sucedida"


def asset_list():
    try:
        params = {
            "sortBy": "name",
            "sortOrder": "asc",
            "token": ASSETS_EXTERNAL_URL_API_KEY
        }
        url = BASE_URL + "quote/list"
        response = requests.get(url, params=params)
    except:
        raise ValidationError(GENERIC_ERROR_MESSAGE)
    data = response.json()
    serialized_assets = [external_asset_serializers.asset_list(obj) for obj in data["stocks"]]

    return serialized_assets


# Tentei fazer buscando somente os ativos que eu queria, mas o Brapi só tem essa opção no pago
# def filtered_asset_list(asset_names_list):
#     try:
#         params = {
#             "token": ASSETS_EXTERNAL_URL_API_KEY
#         }
#         url = BASE_URL + "quote/%s" % asset_names_list
#         response = requests.get(url, params=params)
#     except:
#         raise ValidationError(GENERIC_ERROR_MESSAGE)
#     data = response.json()

#     return data["stocks"]
