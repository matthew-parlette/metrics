from django.forms import widgets
from rest_framework import serializers
from weight.models import Weight

class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight
        fields = ('created', 'value')
