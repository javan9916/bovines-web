import json

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, permissions, pagination, response, status
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Diet, Supplement, DietSupplement, PriceHistory
from .serializers import (
    DietSerializer,
    SupplementSerializer,
    DietSupplementSerializer,
    PriceHistorySerializer,
)


class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = pagination.LimitOffsetPagination

    DIET_CATEGORY_ID = 8

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        supplements = data["supplements"]

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            diet = serializer.save()
            self.create_diet_supplement(diet=diet, supplements=supplements)
            return response.Response(
                data=serializer.data, status=status.HTTP_201_CREATED
            )
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_diet_supplement(self, diet, supplements):
        try:
            supplement_costs = [
                (int(supplement["quantity"]) / int(supplement["kg_presentation"]))
                * int(supplement["prices"][0]["price"])
                for supplement in supplements
            ]
            total_cost = sum(supplement_costs)
            diet.total_cost = total_cost

            supplement_weights = [
                int(supplement["quantity"]) for supplement in supplements
            ]
            total_weight = sum(supplement_weights)
            diet.total_weight = total_weight
            diet.save()

            diet_supplements = [
                DietSupplement(
                    user=self.request.user,
                    diet_id=diet.id,
                    supplement_id=supplement["id"],
                    quantity=supplement["quantity"],
                )
                for supplement in supplements
            ]
            DietSupplement.objects.bulk_create(diet_supplements)
        except Exception as e:
            print(e)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        supplements = data["supplements"]

        serializer = self.get_serializer(instance, data=data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)
            self.update_diet_supplement(diet=instance, supplements=supplements)
            return response.Response(
                data=serializer.data, status=status.HTTP_201_CREATED
            )
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_diet_supplement(self, diet, supplements):
        try:
            supplement_costs = [
                (int(supplement["quantity"]) / int(supplement["kg_presentation"]))
                * int(supplement["prices"][0]["price"])
                for supplement in supplements
            ]
            total_cost = sum(supplement_costs)
            diet.total_cost = total_cost

            supplement_weights = [
                int(supplement["quantity"]) for supplement in supplements
            ]
            total_weight = sum(supplement_weights)
            diet.total_weight = total_weight
            diet.save()

            DietSupplement.objects.filter(diet_id=diet.id).delete()
            diet_supplements = [
                DietSupplement(
                    user=self.request.user,
                    diet_id=diet.id,
                    supplement_id=supplement["id"],
                    quantity=supplement["quantity"],
                )
                for supplement in supplements
            ]
            DietSupplement.objects.bulk_create(diet_supplements)
        except Exception as e:
            print(e)

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )

class SupplementViewSet(viewsets.ModelViewSet):
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = pagination.LimitOffsetPagination

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        price = data["price"]

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            supplement = serializer.save()
            self.create_price_history(supplement, price)
            return response.Response(
                data=serializer.data, status=status.HTTP_201_CREATED
            )
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_price_history(self, supplement, price):
        try:
            price_history = PriceHistory.objects.create(
                user=self.request.user, price=price, supplement=supplement
            )
            price_history.save()
        except Exception as e:
            print(e)

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )


class DietSupplementViewSet(viewsets.ModelViewSet):
    queryset = DietSupplement.objects.all()
    serializer_class = DietSupplementSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["diet_id"]
    ordering = ["id"]

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )


class PriceHistoryViewSet(viewsets.ModelViewSet):
    queryset = PriceHistory.objects.all()
    serializer_class = PriceHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["date"]
    ordering = ["date"]

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )
