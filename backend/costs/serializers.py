from rest_framework import serializers

from .models import Cost, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user
        
        return super().create(validated_data)


class CostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Cost
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        category_pk = request.data.get("category")
        validated_data["category_id"] = category_pk

        return super().create(validated_data)
