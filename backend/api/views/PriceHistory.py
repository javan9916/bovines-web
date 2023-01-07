from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.PriceHistory import PriceHistory
from api.serializers.PriceHistory import PriceHistorySerializer


@api_view(["GET", "POST"])
def histories(request):
    if request.method == "GET":
        histories = PriceHistory.objects.all()
        serializer = PriceHistorySerializer(histories, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = PriceHistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def history(request, id):
    try:
        history = PriceHistory.objects.get(pk=id)
    except PriceHistory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = PriceHistorySerializer(history)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = PriceHistorySerializer(history, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        history.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
