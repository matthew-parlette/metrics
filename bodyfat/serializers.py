from django.forms import widgets
from rest_framework import serializers
from bodyfat.models import BodyFat

class BodyFatSerializer(serializers.ModelSerializer):
    class Meta:
        model = BodyFat
        fields = ('created', 'value')
