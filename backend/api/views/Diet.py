from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Diet import Diet
from api.serializers.Diet import DietSerializer


@api_view(["GET", "POST"])
def diets(request):
    if request.method == "GET":
        diets = Diet.objects.all()
        serializer = DietSerializer(diets, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = DietSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def diet(request, id):
    try:
        diet = Diet.objects.get(pk=id)
    except Diet.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = DietSerializer(diet)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = DietSerializer(diet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        diet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
