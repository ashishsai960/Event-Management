from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Vendor
from .serializers import VendorSerializer

User = get_user_model()

class VendorListByCategoryView(ListAPIView):
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user  # Get logged-in user
        if user.user_type == "Customer" and user.category:
            return Vendor.objects.filter(category=user.category)
        return Vendor.objects.none()  # Return empty if no preference
