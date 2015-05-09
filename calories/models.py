from django.db import models

# Create your models here.
class Calories(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    value = models.FloatField()
    fat = models.FloatField()
    carbohydrates = models.FloatField()
    protein = models.FloatField()

    class Meta:
        ordering = ('created',)
