from django.urls import path
from .views import ProductCreateView, VendorProductListView, ProductUpdateView, ProductDeleteView

urlpatterns = [
    path("add/", ProductCreateView.as_view(), name="add-product"),  # Add a new product
    path("my-products/", VendorProductListView.as_view(), name="vendor-products"),  # View products added by the vendor
    path("<int:pk>/update/", ProductUpdateView.as_view(), name="update-product"),  # Update a product
    path("<int:pk>/delete/", ProductDeleteView.as_view(), name="delete-product"),  # Delete a product
]
