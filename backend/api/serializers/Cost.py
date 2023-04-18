from rest_framework import serializers

from api.models.Cost import Cost

from api.serializers.Category import CategorySerializer


class CostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Cost
        fields = ("id", "name", "type", "category", "date", "cost")

    def create(self, validated_data):
        request = self.context["request"]

        category_pk = request.data.get("category")
        validated_data["category_id"] = category_pk

        return super().create(validated_data)
