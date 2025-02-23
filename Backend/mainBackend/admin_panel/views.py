from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from signup.models import User
from .models import VendorMembership
from .serializers import UserSerializer, VendorMembershipSerializer

class AdminUserListView(generics.ListAPIView):
    """View all users (Customers and Vendors)."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admin can access

class AdminBlockUserView(generics.UpdateAPIView):
    """Block or unblock users."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = not user.is_active  # Toggle user status
        user.save()
        return Response({"message": "User status updated", "is_active": user.is_active})

class AdminDeleteUserView(generics.DestroyAPIView):
    """Delete a user (Customer or Vendor)."""
    queryset = User.objects.all()
    permission_classes = [permissions.IsAdminUser]

class AdminAddUserView(generics.CreateAPIView):
    """Add a new Customer or Vendor."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminVendorMembershipView(generics.ListCreateAPIView):
    """List and add vendor memberships."""
    queryset = VendorMembership.objects.all()
    serializer_class = VendorMembershipSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminVendorMembershipUpdateView(generics.RetrieveUpdateDestroyAPIView):
    """Update or delete vendor memberships."""
    queryset = VendorMembership.objects.all()
    serializer_class = VendorMembershipSerializer
    permission_classes = [permissions.IsAdminUser]
