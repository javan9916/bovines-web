from api.models.Sector import Sector
from rest_framework import serializers


class SectorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sector
        fields = ("name", "area")
