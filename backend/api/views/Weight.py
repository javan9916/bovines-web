from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Weight import Weight
from api.serializers.Weight import WeightSerializer


@api_view(["GET", "POST"])
def weights(request):
    if request.method == "GET":
        weights = Weight.objects.all()
        serializer = WeightSerializer(weights, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = WeightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def weight(request, id):
    try:
        weight = Weight.objects.get(pk=id)
    except Weight.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = WeightSerializer(weight)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = WeightSerializer(weight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        weight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
