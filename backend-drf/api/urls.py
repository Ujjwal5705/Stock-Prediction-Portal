from django.contrib import admin
from django.urls import path
from accounts import views as UserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path("register/", UserView.Register.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-view/', UserView.ProtectedView.as_view()),

    # Prediction view
    path('predict/', views.StockPredictionAPIView.as_view()),
]
