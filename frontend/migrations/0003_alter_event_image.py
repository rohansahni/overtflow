# Generated by Django 4.2.5 on 2024-03-18 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_remove_event_event_id_event_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.BinaryField(),
        ),
    ]
