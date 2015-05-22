from django.db import models

# Create your models here.
class Food(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=200)
    unit = models.CharField(max_length=50)
    calories = models.FloatField()
    fat = models.FloatField()
    carbohydrates = models.FloatField()
    protein = models.FloatField()
