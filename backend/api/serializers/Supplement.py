from rest_framework import serializers

from api.models.Supplement import Supplement
from api.models.PriceHistory import PriceHistory

from api.serializers.PriceHistory import PriceHistorySerializer


class SupplementSerializer(serializers.ModelSerializer):
    prices = serializers.SerializerMethodField()

    class Meta:
        model = Supplement
        fields = ("id", "name", "description", "kg_presentation", "prices")

    def get_prices(self, instance):
        prices = PriceHistory.objects.filter(supplement_id=instance.id).order_by(
            "-date"
        )
        return PriceHistorySerializer(prices, many=True).data
