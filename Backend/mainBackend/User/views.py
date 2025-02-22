from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Vendor
from .serializers import VendorSerializer
from product.models import Product
from product.serializers import ProductSerializer

User = get_user_model()


# Customer Dashboard API
class CustomerDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.user_type != "Customer":
            return Response({"error": "Access denied"}, status=403)

        return Response({
            "menu": ["Vendor", "Cart", "Guest List", "Order Status", "Logout"]
        })


# Vendor Category API (Returns available vendor categories)
class VendorCategoryListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = ["Catering", "Florist", "Decoration", "Lighting"]
        return Response({"categories": categories})


# Vendor List API (Returns vendors filtered by category)
class VendorListByCategoryView(ListAPIView):
    serializer_class = VendorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        category = self.request.query_params.get("category")
        if category:
            return Vendor.objects.filter(category=category)
        return Vendor.objects.none()  # Return empty queryset if no category selected


# Vendor Product List API (Returns all products from a selected vendor)
class VendorProductListView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        vendor_id = self.request.query_params.get("vendor_id")
        if vendor_id:
            return Product.objects.filter(vendor__id=vendor_id)
        return Product.objects.none()  # Return empty queryset if vendor_id is not provided
