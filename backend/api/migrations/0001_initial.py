# Generated by Django 4.1.3 on 2023-04-18 00:32

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Animal",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("sex", models.CharField(max_length=1)),
                ("breed", models.CharField(max_length=100, null=True)),
                ("origin", models.CharField(max_length=1, null=True)),
                ("badge_number", models.IntegerField(default=0)),
                ("cost_per_kg", models.IntegerField(default=0)),
                ("value", models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Diet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("total_cost", models.IntegerField(default=0)),
                ("total_weight", models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="Sector",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("area", models.FloatField(null=True)),
                ("has_group", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Supplement",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField(max_length=255)),
                ("kg_presentation", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Weight",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("weight", models.FloatField()),
                ("date", models.DateField()),
                (
                    "animal",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.animal"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="PriceHistory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("price", models.FloatField()),
                (
                    "date",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                (
                    "supplement",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.supplement",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Phase",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(default="etapa", max_length=100)),
                ("min_weight", models.IntegerField(default=0)),
                ("max_weight", models.IntegerField(default=0)),
                (
                    "diet",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.diet",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Group",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("animals", models.ManyToManyField(to="api.animal")),
                (
                    "sector",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.sector",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="DietSupplement",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("quantity", models.PositiveIntegerField()),
                (
                    "diet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.diet"
                    ),
                ),
                (
                    "supplement",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.supplement"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Cost",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("type", models.CharField(max_length=1)),
                ("date", models.DateField(null=True)),
                ("cost", models.FloatField(default=0)),
                (
                    "category",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.category",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="animal",
            name="cost",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.SET_NULL, to="api.cost"
            ),
        ),
        migrations.AddField(
            model_name="animal",
            name="phase",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="api.phase"
            ),
        ),
    ]
