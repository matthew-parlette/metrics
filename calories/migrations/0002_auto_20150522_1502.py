# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calories', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='calories',
            name='name',
            field=models.CharField(default=b'', max_length=200, blank=True),
        ),
        migrations.AlterField(
            model_name='calories',
            name='carbohydrates',
            field=models.FloatField(default=0.0, blank=True),
        ),
        migrations.AlterField(
            model_name='calories',
            name='created',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='calories',
            name='fat',
            field=models.FloatField(default=0.0, blank=True),
        ),
        migrations.AlterField(
            model_name='calories',
            name='protein',
            field=models.FloatField(default=0.0, blank=True),
        ),
        migrations.AlterField(
            model_name='calories',
            name='value',
            field=models.FloatField(default=0.0, blank=True),
        ),
    ]
