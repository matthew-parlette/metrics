from weight.models import Weight
from weight.serializers import WeightSerializer
from rest_framework import generics

class WeightList(generics.ListCreateAPIView):
    """
    List all weight entries, or create a new weight entry.
    """
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer

class WeightDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a weight instance.
    """
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
