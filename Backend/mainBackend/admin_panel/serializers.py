from rest_framework import serializers
from signup.models import User
from .models import VendorMembership

class UserSerializer(serializers.ModelSerializer):
    """Serializer for listing users."""
    class Meta:
        model = User
        fields = ["id", "username", "email", "user_type", "is_active"]

class VendorMembershipSerializer(serializers.ModelSerializer):
    """Serializer for vendor memberships."""
    class Meta:
        model = VendorMembership
        fields = "__all__"
