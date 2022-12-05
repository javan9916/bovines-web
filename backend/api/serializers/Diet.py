from api.models.Diet import Diet
from rest_framework import serializers


class DietSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Diet
        fields = ("name", "total_cost", "supplements")
