from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
import matplotlib.pyplot as plt
from .utils import save_plot
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
            
            df.reset_index(inplace=True)

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
            plot_url = save_plot(image_name)

            # 100 days moving average
            df['MA_100'] = df['Close'].rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(9, 5))
            plt.plot(df.MA_100, 'r', label='100 days moving average')
            plt.plot(df.Close, label='Closing Price')
            plt.title(ticker)
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            
            # Save Plot
            image_100_name = f'{ticker}_100_dma.png'
            plot_100_url = save_plot(image_100_name)

            return Response({
                'Success': 'Success',
                'plot': plot_url,
                'plot_100': plot_100_url,
            })