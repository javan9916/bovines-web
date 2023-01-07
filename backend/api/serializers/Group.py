from rest_framework import serializers

from api.models.Group import Group


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = (
            "id",
            "name",
            "phases",
            "sector",
            "total_days",
            "animals",
            "purchase_date",
            "initial_weight",
        )
