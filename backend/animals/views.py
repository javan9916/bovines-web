import json

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, permissions, pagination, response, status
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Animal, Phase, Weight, Sector, Group
from costs.models import Cost, Category
from .serializers import (
    AnimalSerializer,
    PhaseSerializer,
    WeightSerializer,
    SectorSerializer,
    GroupSerializer,
)
from .filters import AnimalFilter


class PhaseViewSet(viewsets.ModelViewSet):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = AnimalFilter
    pagination_class = pagination.LimitOffsetPagination
    ordering = ["id"]

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )


class WeightViewSet(viewsets.ModelViewSet):
    queryset = Weight.objects.all()
    serializer_class = WeightSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [OrderingFilter]
    ordering = ["date"]

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        body = json.loads(body_unicode)
        data = body["data"]

        serializer = self.get_serializer(data=data)
        phase_assigned = self.assign_animal_phase(data=data)
        if serializer.is_valid() and phase_assigned:
            weights = serializer.save()
            self.create_animal_cost(weights, data)
            return response.Response(
                data=serializer.data, status=status.HTTP_201_CREATED
            )
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(WeightViewSet, self).get_serializer(*args, **kwargs)
    
    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )

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
        animal_cost_category = Category.objects.filter(name='Compra animales', user=self.request.user).first()

        if not animal.cost:
            cost = Cost.objects.create(
                user=self.request.user,
                name=f"animal #{animal.badge_number}",
                type="I",
                category=animal_cost_category,
                cost=animal.value,
                date=weights[-1].date,
            )
            cost.save()
            animal.cost = cost
            animal.save()


class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["has_group"]
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["animals"]
    ordering = ["id"]

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        sector_pk = data["sector"]

        sector = Sector.objects.get(pk=sector_pk)
        sector.has_group = True
        sector.save()
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        sector_pk = data["sector"]

        if sector_pk != instance.sector.pk:
            instance.sector.has_group = False
            instance.sector.save()
            sector = Sector.objects.get(pk=sector_pk)
            sector.has_group = True
            sector.save()
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.sector.has_group = False
        instance.sector.save()
        return super().destroy(request, *args, **kwargs)

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )
    