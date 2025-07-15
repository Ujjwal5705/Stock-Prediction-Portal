from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
import yfinance as yf
import pandas as pd
import numpy as np

# Create your views here.

class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # Fetch data from yFinance
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({'error': 'No data found for the given ticker', 'status': status.HTTP_404_NOT_FOUND})
            print(df)
            return Response('Success')