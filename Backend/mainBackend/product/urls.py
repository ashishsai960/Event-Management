from django.urls import path
from .views import AddProductView

urlpatterns = [
    path('add/', AddProductView.as_view(), name='add-product'),
]
