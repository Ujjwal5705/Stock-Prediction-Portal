from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
import matplotlib.pyplot as plt
from datetime import datetime
from django.conf import settings
import yfinance as yf
import pandas as pd
import numpy as np
import os

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
            
            df.reset_index(inplace=True)
            print(df)

            # Generate Basic Plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(9, 5))
            plt.plot(df.Close, label='Closing Price')
            plt.title(ticker)
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            # Save Plot
            image_name = f'{ticker}_plot.png'
            image_path = os.path.join(settings.MEDIA_ROOT, image_name)
            plt.savefig(image_path)
            plt.close()

            image_url = settings.MEDIA_URL + image_name
            return Response({
                'Success': 'Success',
                'plot': image_url,
            })