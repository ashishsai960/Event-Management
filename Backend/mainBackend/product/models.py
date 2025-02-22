from django.db import models
from signup.models import User 
from django.utils.timezone import now 

class Product(models.Model):
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products", default=1)  # Vendor who added the product
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="product_images/", null=True, blank=True)
    created_at = models.DateTimeField(default=now, editable=False)  # Auto-filled timestamp

    def __str__(self):
        return self.name

