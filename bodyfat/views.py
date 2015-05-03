from bodyfat.models import BodyFat
from bodyfat.serializers import BodyFatSerializer
from rest_framework import generics

class BodyFatList(generics.ListCreateAPIView):
    """
    List all body fat entries, or create a new body fat entry.
    """
    queryset = BodyFat.objects.all()
    serializer_class = BodyFatSerializer

class BodyFatDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a body fat instance.
    """
    queryset = BodyFat.objects.all()
    serializer_class = BodyFatSerializer
