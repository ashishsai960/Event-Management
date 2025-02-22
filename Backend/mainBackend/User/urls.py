from django.urls import path
from .views import VendorListByCategoryView

urlpatterns = [
    path('vendors/', VendorListByCategoryView.as_view(), name='vendor-list-by-category'),
]
