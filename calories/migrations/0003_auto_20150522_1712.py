# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calories', '0002_auto_20150522_1502'),
    ]

    operations = [
        migrations.AddField(
            model_name='calories',
            name='date',
            field=models.DateField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='calories',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
