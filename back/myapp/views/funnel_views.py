from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from myapp.forms import funnel_forms
from myapp.services import funnel_svc
from myapp.serializers import funnel_serializers
import json


@csrf_exempt
def funnel(request):
    if request.method == "GET":
        params = funnel_forms.GetFunnelForm.model_validate(request.GET.dict())
        funnels_query = funnel_svc.get_funnels(params.id, params.name, params.user_id)
        serialized_funnels = [funnel_serializers.funnel(funnel) for funnel in funnels_query]

        return JsonResponse(serialized_funnels, safe=False)

    elif request.method == "POST":
        params = funnel_forms.PostFunnelForm.model_validate(json.loads(request.body)["params"])
        funnel = funnel_svc.post_funnel(
            params.name, params.periodicity, params.max_value, params.min_value, params.user_id
        )
        serialized_funnel = funnel_serializers.funnel(funnel)

        return JsonResponse(serialized_funnel, safe=False)


@csrf_exempt
def remove_funnel(request):
    params = funnel_forms.RemoveFunnelForm.model_validate(json.loads(request.body)["params"])
    funnel_svc.remove_funnel(params.id)

    return JsonResponse({}, safe=False)
