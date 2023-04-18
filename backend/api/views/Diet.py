import json

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import LimitOffsetPagination

from django_filters.rest_framework import DjangoFilterBackend

from api.models.Diet import Diet
from api.serializers.Diet import DietSerializer

from api.models.DietSupplement import DietSupplement


class DietViewSet(ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = LimitOffsetPagination

    DIET_CATEGORY_ID = 8

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        supplements = data["supplements"]

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            diet = serializer.save()
            self.create_diet_supplement(diet=diet, supplements=supplements)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_diet_supplement(self, diet, supplements):
        try:
            supplement_costs = [(int(supplement['quantity']) / int(supplement['kg_presentation'])) * int(supplement['prices'][0]['price']) for supplement in supplements]
            total_cost = sum(supplement_costs)
            diet.total_cost = total_cost

            supplement_weights = [int(supplement['quantity']) for supplement in supplements]
            total_weight = sum(supplement_weights)
            diet.total_weight = total_weight
            diet.save()

            diet_supplements = [
                DietSupplement(
                    diet_id=diet.id, supplement_id=supplement['id'], quantity=supplement['quantity']
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
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update_diet_supplement(self, diet, supplements):
        try:
            supplement_costs = [(int(supplement['quantity']) / int(supplement['kg_presentation'])) * int(supplement['prices'][0]['price']) for supplement in supplements]
            total_cost = sum(supplement_costs)
            diet.total_cost = total_cost

            supplement_weights = [int(supplement['quantity']) for supplement in supplements]
            total_weight = sum(supplement_weights)
            diet.total_weight = total_weight
            diet.save()

            DietSupplement.objects.filter(diet_id=diet.id).delete()
            diet_supplements = [
                DietSupplement(
                    diet_id=diet.id, supplement_id=supplement['id'], quantity=supplement['quantity']
                )
                for supplement in supplements
            ]
            DietSupplement.objects.bulk_create(diet_supplements)
        except Exception as e:
            print(e)
