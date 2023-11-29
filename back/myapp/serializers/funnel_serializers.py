def funnel(obj):
    return {
        "id": obj.id,
        "name": obj.asset.name,
        "periodicity": obj.periodicity,
        "max_value": obj.max_value,
        "min_value": obj.min_value
    }
