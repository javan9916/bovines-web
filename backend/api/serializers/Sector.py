from rest_framework import serializers

from api.models.Sector import Sector


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ("id", "name", "area")
