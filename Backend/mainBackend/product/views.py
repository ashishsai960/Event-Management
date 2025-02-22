from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from .serializers import ProductSerializer

# ✅ Add a new product (Vendor only)
class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can add products
    parser_classes = [MultiPartParser, FormParser]  # Supports image uploads

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)  # Set the vendor automatically


# ✅ Vendor can view all their products
class VendorProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Product.objects.filter(vendor=self.request.user)  # Get only the vendor's products
