from django.forms import widgets
from rest_framework import serializers
from food.models import Food

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('created', 'name', 'unit', 'calories', 'fat', 'carbohydrates', 'protein')
