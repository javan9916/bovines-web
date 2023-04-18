from rest_framework import serializers

from api.models.Weight import Weight
from api.models.Animal import Animal
from api.models.Phase import Phase


class WeightSerializer(serializers.ModelSerializer):
    gpt = serializers.SerializerMethodField()
    gpd = serializers.SerializerMethodField()
    fca = serializers.SerializerMethodField()

    class Meta:
        model = Weight
        fields = ("id", "animal", "weight", "date", "gpt", "gpd", "fca")

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
        
        gained_weight = instance.weight - previous.weight
        print(previous.animal.phase)
        food_consumption = previous.animal.phase.diet.total_weight * date_difference.days
        if gained_weight == 0:
            return 0
        
        fca = food_consumption / gained_weight
        return round(fca, 2)