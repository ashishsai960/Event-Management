from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    vendor_name = serializers.ReadOnlyField(source="vendor.username")  # Get vendor's username

    class Meta:
        model = Product
        fields = ["id", "vendor", "vendor_name", "name", "price", "image", "created_at"]
        extra_kwargs = {"vendor": {"read_only": True}}  # Vendor is automatically set
