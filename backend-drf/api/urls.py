from django.contrib import admin
from django.urls import path
from accounts import views as UserView

urlpatterns = [
    path("register/", UserView.Register.as_view()),
]
