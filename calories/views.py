from calories.models import Calories
from calories.serializers import CaloriesSerializer
from rest_framework import generics

class CaloriesList(generics.ListCreateAPIView):
    """
    List all calorie entries, or create a new calorie entry.
    """
    queryset = Calories.objects.all()
    serializer_class = CaloriesSerializer

class CaloriesDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a calorie instance.
    """
    queryset = Calories.objects.all()
    serializer_class = CaloriesSerializer
