from django.urls import path
from .views import ProductCreateView, VendorProductListView, ProductUpdateView, ProductDeleteView

urlpatterns = [
    path("add/", ProductCreateView.as_view(), name="add-product"),  
    path("my-products/", VendorProductListView.as_view(), name="vendor-products"),  
    path("<int:pk>/update/", ProductUpdateView.as_view(), name="update-product"),  
    path("<int:pk>/delete/", ProductDeleteView.as_view(), name="delete-product"),  
]
