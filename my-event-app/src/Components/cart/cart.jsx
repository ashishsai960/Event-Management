import React, { useState } from "react";
import "./cart.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 2,
      image: "https://via.placeholder.com/50",
    },
  ]);

  // Calculate total price for each item
  const calculateTotalPrice = (item) => item.price * item.quantity;

  // Calculate grand total
  const grandTotal = cartItems.reduce(
    (acc, item) => acc + calculateTotalPrice(item),
    0
  );

  // Remove single item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Delete all items
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title" onClick={() => navigate("/userhome")}>
          Home
        </h1>
        <div className="nav-btns">
          <button className="nav-button">View Product</button>
          <button className="nav-button">Request Item</button>
          <button className="nav-button">Product Status</button>
          <button className="nav-button logout">Logout</button>
        </div>
      </nav>

      {/* Shopping Cart Heading */}
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="checkout-btn">Proceed to checkout</button>
      </div>

      {/* Cart Table */}
      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th className="small-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${calculateTotalPrice(item)}</td>
                <td>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {/* Grand Total Row */}
            <tr className="grand-total-row">
              <td colSpan="4" className="text-right">
                Grand Total:
              </td>
              <td>${grandTotal}</td>
              <td>
                <button onClick={clearCart} className="delete-all-btn">
                  Delete All
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartPage;
