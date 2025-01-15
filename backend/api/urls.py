from django.urls import path
# from .views import get_recommendation
from .views import api_home, get_recommendation
from .import views

urlpatterns = [
    path('', api_home, name='api_home'),  # Default API homepage
    path('recommendations/', views.get_recommendation, name='get_recommendation'),
    path('recommendations/', views.get_recommendation, name='get_recommendation'),
]
