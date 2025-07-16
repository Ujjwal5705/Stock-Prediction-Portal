from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
from keras.models import load_model
from .utils import save_plot
from datetime import datetime
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
            plt.plot(df.MA_100, 'r', label='100 DMA')
            plt.plot(df.Close, label='Closing Price')
            plt.title(f'100 Days Moving-Average - {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            
            # Save Plot
            image_100_name = f'{ticker}_100_dma.png'
            plot_100_url = save_plot(image_100_name)

            # 200 days moving average
            df['MA_200'] = df['Close'].rolling(200).mean()
            plt.figure(figsize=(9, 5))
            plt.plot(df['Close'], label='Closing Price')
            plt.plot(df['MA_100'], 'r', label='100 DMA')
            plt.plot(df['MA_200'], 'g', label='200 DMA')
            plt.title(f'200 Days Moving-Average - {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            # Save plot
            image_200_name = f'{ticker}_200_dma.png'
            plot_200_url = save_plot(image_200_name)

            # Percent change
            df['Percentage Change'] = df['Close'].pct_change()
            plt.figure(figsize=(9, 5))
            plt.plot(df['Percentage Change'])
            plt.title('Percent Change')

            # Save plot
            image_pctchange_name = f'{ticker}_pct.png'
            plot_pct_url = save_plot(image_pctchange_name)

            # Splitting data into training and testing datasets.
            training_df = pd.DataFrame(df['Close'][0:int(len(df)*0.7)])
            testing_df = pd.DataFrame(df['Close'][int(len(df)*0.7):len(df)])

            # Scaling down between 0 and 1
            scaler = MinMaxScaler(feature_range=(0, 1))

            # Load ML Model
            model = load_model('../Resources/stock_prediction_model.keras')

            # Preparing Test Data
            past_100_days = training_df.tail(100)
            final_df = pd.concat([past_100_days, testing_df], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i, 0])
            x_test, y_test = np.array(x_test), np.array(y_test)

            # Predictions
            y_predicted = model.predict(x_test)

            # revert scaled transform to original price
            y_predicted = scaler.inverse_transform(y_predicted)
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1))
            y_predicted = pd.DataFrame(y_predicted)
            y_test = pd.DataFrame(y_test)

            # Making Predictions
            plt.figure(figsize=(9, 5))
            plt.plot(y_test, 'r', label='Original Price')
            plt.plot(y_predicted, 'g', label='Predicted Price')
            plt.title(f'Prediction for - {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()

            # Save predicted plot
            image_prediction_name = f'{ticker}_prediction.png'
            image_prediction_url = save_plot(image_prediction_name)

            # Model Evaluation
            # MSE, RMSE and r2_score
            mse = mean_squared_error(y_test, y_predicted)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_predicted)

            return Response({
                'Success': 'Success',
                'plot': plot_url,
                'plot_100': plot_100_url,
                'plot_200': plot_200_url,
                'plot_pct': plot_pct_url,
                'prediction': image_prediction_url,
                'mse': mse,
                'rmse': rmse,
                'r2': r2,
            })