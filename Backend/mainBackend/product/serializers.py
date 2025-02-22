from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'vendor', 'name', 'price', 'image', 'created_at']
        read_only_fields = ['vendor', 'created_at']
