from api.models.Group import Group
from rest_framework import serializers


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ("name", "phases", "sector", "total_days", "animals", "purchase_date", "initial_weight")
        