from rest_framework import serializers

from .models import Diet, Supplement, DietSupplement, PriceHistory


class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)


class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        if request.user:
            user = request.user
            validated_data["user"] = user

        return super().create(validated_data)


class SupplementSerializer(serializers.ModelSerializer):
    prices = serializers.SerializerMethodField()

    class Meta:
        model = Supplement
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)

    def get_prices(self, instance):
        prices = PriceHistory.objects.filter(supplement_id=instance.id).order_by(
            "-date"
        )
        return PriceHistorySerializer(prices, many=True).data


class DietSupplementSerializer(serializers.ModelSerializer):
    supplement = SupplementSerializer(read_only=True)

    class Meta:
        model = DietSupplement
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)
