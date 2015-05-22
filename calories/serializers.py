from django.forms import widgets
from rest_framework import serializers
from calories.models import Calories

class CaloriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calories
        fields = ('created', 'date', 'name', 'value', 'fat', 'carbohydrates', 'protein')
