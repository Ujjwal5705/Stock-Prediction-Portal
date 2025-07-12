from django.shortcuts import render
from rest_framework.views import APIView
from serializers import StockPredictionSerializer
from rest_framework.response import Response

# Create your views here.

class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            return Response('Success')