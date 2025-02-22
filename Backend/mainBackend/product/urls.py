from django.urls import path
from .views import ProductCreateView, VendorProductListView

urlpatterns = [
    path("add/", ProductCreateView.as_view(), name="add-product"),  # Add product
    path("my-products/", VendorProductListView.as_view(), name="vendor-products"),  # View own products
]
