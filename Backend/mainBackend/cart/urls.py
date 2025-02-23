from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView, CheckoutView

urlpatterns = [
    path("mycart/", CartView.as_view(), name="cart-view"),
    path("add/", AddToCartView.as_view(), name="add-to-cart"),
    path("remove/<int:item_id>/", RemoveFromCartView.as_view(), name="remove-from-cart"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
]
