from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.DietSupplement import DietSupplement
from api.serializers.DietSupplement import DietSupplementSerializer


@api_view(["GET", "POST"])
def diet_supplements(request):
    if request.method == "GET":
        diet_supplements = DietSupplement.objects.all()
        serializer = DietSupplementSerializer(diet_supplements, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = DietSupplementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def diet_supplement(request, id):
    try:
        diet_supplement = DietSupplement.objects.get(pk=id)
    except DietSupplement.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = DietSupplementSerializer(diet_supplement)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = DietSupplementSerializer(diet_supplement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        diet_supplement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
