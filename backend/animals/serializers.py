from rest_framework import serializers

from .models import Animal, Weight, Group, Phase, Sector
from costs.serializers import CostSerializer


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)


class AnimalSerializer(serializers.ModelSerializer):
    cost = CostSerializer(read_only=True)
    phase = PhaseSerializer(read_only=True)
    weights = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField()
    ANIMAL_CATEGORY_ID = 7

    class Meta:
        model = Animal
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)

    def get_weights(self, instance):
        weights = Weight.objects.filter(animal_id=instance.id)
        return WeightSerializer(weights, many=True).data

    def get_group(self, instance):
        groups = Group.objects.all()
        for group in groups:
            if group.animals.filter(id=instance.id).exists():
                return group.id
        return None


class WeightSerializer(serializers.ModelSerializer):
    gpt = serializers.SerializerMethodField()
    gpd = serializers.SerializerMethodField()
    fca = serializers.SerializerMethodField()

    class Meta:
        model = Weight
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)

    def get_gpd(self, instance):
        previous = None
        weights = Weight.objects.filter(animal=instance.animal).order_by("date")
        for weight in weights:
            if not weight.pk == instance.pk:
                previous = weight
            else:
                if not previous:
                    return 0
                break

        date_difference = instance.date - previous.date
        if date_difference.days == 0:
            return 0
        gpd = (instance.weight - previous.weight) / date_difference.days
        return round(gpd, 2)

    def get_gpt(self, instance):
        first = Weight.objects.filter(animal=instance.animal).order_by("date").first()
        date_difference = instance.date - first.date
        if date_difference.days == 0:
            return 0
        gpt = (instance.weight - first.weight) / date_difference.days
        return round(gpt, 2)

    def get_fca(self, instance):
        previous = None
        weights = Weight.objects.filter(animal=instance.animal).order_by("date")
        for weight in weights:
            if not weight.pk == instance.pk:
                previous = weight
            else:
                if not previous:
                    return 0
                break

        date_difference = instance.date - previous.date
        if date_difference.days == 0:
            return 0
        
        print()

        gained_weight = instance.weight - previous.weight
        food_consumption = 0
        if previous.animal.phase.diet:
            food_consumption = (
                previous.animal.phase.diet.total_weight * date_difference.days
            )
            
        if gained_weight == 0:
            return 0

        fca = food_consumption / gained_weight
        return round(fca, 2)


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        return super().create(validated_data)


class GroupSerializer(serializers.ModelSerializer):
    sector = SectorSerializer(read_only=True)
    animals = AnimalSerializer(read_only=True, many=True)

    class Meta:
        model = Group
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]

        user = request.user
        validated_data["user"] = user

        sector_pk = request.data.get("sector")
        validated_data["sector_id"] = sector_pk

        animals = request.data.get("animals")
        animals_data = [animal["id"] for animal in animals]
        validated_data["animals"] = animals_data

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context["request"]

        sector_pk = request.data.get("sector")
        validated_data["sector_id"] = sector_pk

        animals = request.data.get("animals")
        animals_data = [animal["id"] for animal in animals]
        validated_data["animals"] = animals_data
        return super().update(instance, validated_data)
