def asset(obj):
    return {
        "id": obj.id,
        "name": obj.name,
        "periodicity": obj.periodicity,
        "max_value": obj.max_value,
        "min_value": obj.min_value
    }
