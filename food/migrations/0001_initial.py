# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=200)),
                ('unit', models.CharField(max_length=50)),
                ('calories', models.FloatField()),
                ('fat', models.FloatField()),
                ('carbohydrates', models.FloatField()),
                ('protein', models.FloatField()),
            ],
        ),
    ]
