from django.db import models

# Create your models here.
class Calories(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    date = models.DateField(blank = True, null = True)
    name = models.CharField(max_length = 200, blank = True, default = '')
    value = models.FloatField(blank = True, default = 0.0)
    fat = models.FloatField(blank = True, default = 0.0)
    carbohydrates = models.FloatField(blank = True, default = 0.0)
    protein = models.FloatField(blank = True, default = 0.0)

    class Meta:
        ordering = ('created',)
