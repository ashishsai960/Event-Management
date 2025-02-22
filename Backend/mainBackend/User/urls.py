from django.urls import path
from .views import (
    CustomerDashboardView,
    VendorCategoryListView,
    VendorListByCategoryView,
    VendorProductListView
)

urlpatterns = [
    path("dashboard/", CustomerDashboardView.as_view(), name="customer-dashboard"),
    path("categories/", VendorCategoryListView.as_view(), name="vendor-categories"),
    path("vendors/", VendorListByCategoryView.as_view(), name="vendor-list"),
    path("products/", VendorProductListView.as_view(), name="vendor-products"),
]
