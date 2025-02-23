from django.db import models
from signup.models import User

class VendorMembership(models.Model):
    vendor = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"user_type": "Vendor"})
    membership_type = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_months = models.IntegerField()

    def __str__(self):
        return f"{self.vendor.username} - {self.membership_type}"
