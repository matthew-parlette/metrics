from django.shortcuts import render
from weight.views import WeightList

def index(request):
    context = {
        'weight': WeightList
    }
    return render(request, 'index.html', context)
