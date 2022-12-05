from api.models.PriceHistory import PriceHistory
from rest_framework import serializers


class PriceHistorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ("price", "date")
