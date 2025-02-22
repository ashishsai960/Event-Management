import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./checkout.css";
const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const grandTotal = location.state?.totalAmount || 0;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    paymentMethod: "Cash",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <div className="checkout-container">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="nav-title" onClick={() => navigate("/userhome")}>
          Home
        </h1>
        <div className="nav-btns">
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            Cart
          </button>
          <button className="logout-btn" onClick={() => alert("Logging Out!")}>
            Logout
          </button>
        </div>
      </div>

      {/* Grand Total Display */}
      <div className="grand-total">
        <h2>Grand Total: ₹{grandTotal}</h2>
      </div>

      {/* Checkout Form */}
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="paymentMethod"
              placeholder="Select Payment Method"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address line1"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="pinCode"
              placeholder="PinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
