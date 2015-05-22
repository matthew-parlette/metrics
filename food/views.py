from food.models import Food
from food.serializers import FoodSerializer
from rest_framework import generics

class FoodList(generics.ListCreateAPIView):
    """
    List all calorie entries, or create a new calorie entry.
    """
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

class FoodDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a calorie instance.
    """
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
