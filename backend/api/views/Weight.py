import json

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated

from api.models.Weight import Weight
from api.models.Phase import Phase
from api.models.Cost import Cost
from api.models.Category import Category

from api.serializers.Weight import WeightSerializer

from api.views.Animal import Animal


class WeightViewSet(ModelViewSet):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = ["date"]

    ANIMAL_CATEGORY_ID = 7

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)
        data = body["data"]

        serializer = self.get_serializer(data=data)
        phase_assigned = self.assign_animal_phase(data=data)
        if serializer.is_valid() and phase_assigned:
            weights = serializer.save()
            self.create_animal_cost(weights, data)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(WeightViewSet, self).get_serializer(*args, **kwargs)

    def assign_animal_phase(self, data):
        if isinstance(data, list):
            data = data[-1]

        try:
            arrival_weight = int(data["weight"])
            animal_id = data["animal"]
            animal = Animal.objects.get(pk=animal_id)

            animal_value = arrival_weight * animal.cost_per_kg
            animal.value = animal_value
            animal.phase = Phase.objects.filter(
                min_weight__lte=arrival_weight, max_weight__gte=arrival_weight
            ).first()

            animal.save()
            return True
        except Exception as e:
            print(e)
            return False

    def create_animal_cost(self, weights, data):
        if isinstance(data, list):
            data = data[-1]

        animal_id = data["animal"]
        animal = Animal.objects.get(pk=animal_id)
        print(animal.cost)

        if not animal.cost:
            cost = Cost.objects.create(
                name=f"animal #{animal.badge_number}",
                type="I",
                category=Category.objects.get(pk=self.ANIMAL_CATEGORY_ID),
                cost=animal.value,
                date=weights[-1].date,
            )
            cost.save()
            animal.cost = cost
            animal.save()
