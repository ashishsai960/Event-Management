from django.urls import path
from .views import (
    AdminUserListView, AdminBlockUserView, AdminDeleteUserView, AdminAddUserView,
    AdminVendorMembershipView, AdminVendorMembershipUpdateView
)

urlpatterns = [
    path("users/", AdminUserListView.as_view(), name="admin-users"),
    path("block-user/<int:pk>/", AdminBlockUserView.as_view(), name="block-user"),
    path("delete-user/<int:pk>/", AdminDeleteUserView.as_view(), name="delete-user"),
    path("add-user/", AdminAddUserView.as_view(), name="add-user"),
    path("membership/", AdminVendorMembershipView.as_view(), name="membership-list"),
    path("membership/<int:pk>/", AdminVendorMembershipUpdateView.as_view(), name="membership-detail"),
]
