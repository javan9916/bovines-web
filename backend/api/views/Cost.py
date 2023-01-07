from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Cost import Cost
from api.serializers.Cost import CostSerializer


@api_view(["GET", "POST"])
def costs(request):
    if request.method == "GET":
        costs = Cost.objects.all()
        serializer = CostSerializer(costs, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = CostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def cost(request, id):
    try:
        cost = Cost.objects.get(pk=id)
    except Cost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CostSerializer(cost)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = CostSerializer(cost, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        cost.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
