# Generated by Django 4.1.3 on 2023-01-31 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_remove_group_initial_weight_remove_group_phases_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="animal",
            name="purchase_date",
        ),
        migrations.AddField(
            model_name="animal",
            name="breed",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="animal",
            name="origin",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
