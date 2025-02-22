from django.db import models

class Vendor(models.Model):
    CATEGORY_CHOICES = [
        ('Catering', 'Catering'),
        ('Florist', 'Florist'),
        ('Decoration', 'Decoration'),
        ('Lighting', 'Lighting'),
    ]
    
    name = models.CharField(max_length=255, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Catering')  # Default category added

    def __str__(self):
        return self.name
