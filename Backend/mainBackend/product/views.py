from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from .serializers import ProductSerializer

class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # Supports image upload

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)  # Auto-assign vendor



class VendorProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)  # Vendor sees only their products



class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)  # Vendor can update only their products



class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)  # Vendor can delete only their products
