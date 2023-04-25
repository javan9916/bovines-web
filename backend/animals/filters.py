import django_filters
from django.db.models import Q

from .models import Animal


class AnimalFilter(django_filters.FilterSet):
    group__isnull = django_filters.BooleanFilter(
        field_name="group", method="get_null_groups"
    )
    group__isnull_or_equal = django_filters.NumberFilter(
        field_name="group", method="get_null_or_equal"
    )

    class Meta:
        model = Animal
        fields = ["sex", "origin", "phase"]

    @staticmethod
    def get_null_groups(queryset, _, value):
        return queryset.filter(group__isnull=value)

    @staticmethod
    def get_null_or_equal(queryset, _, value):
        return queryset.filter(Q(group=value) | Q(group__isnull=True))
