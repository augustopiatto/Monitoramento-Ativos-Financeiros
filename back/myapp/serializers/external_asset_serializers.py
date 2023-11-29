def asset_list(obj):
    return {
        "name": obj["stock"],
        "cur_value": obj["close"]
    }
