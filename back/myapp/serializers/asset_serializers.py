def asset(obj):
    return {
        "id": obj.id,
        "name": obj.name,
        "periodicity": obj.periodicity,
        "max_value": obj.max_value,
        "min_value": obj.min_value
    }


def asset_price(obj):
    return {
        "name": obj.name,
        "cur_value": obj.cur_value
    }
