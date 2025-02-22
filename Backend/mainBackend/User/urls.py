from django.urls import path
from .views import VendorListByCategoryView

urlpatterns = [
    path('api/vendors/', VendorListByCategoryView.as_view(), name='vendor-list-by-category'),
]
