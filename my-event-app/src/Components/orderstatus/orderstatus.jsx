import React from "react";
import { useNavigate } from "react-router-dom";
import "./orderstatus.css";

const OrderStatus = () => {
  const navigate = useNavigate();
  const orders = [
    {
      productName: "Tulips",
      productPrice: "500",
      address: "123 Main St",
      status: "Out for Delivery",
    },
    {
      productName: "Sweets",
      productPrice: "1000",
      address: "456 Park Ave",
      status: "Ready for Shipping",
    },
    {
      productName: "LED lights",
      productPrice: "180",
      address: "789 Broadway",
      status: "Received",
    },
  ];

  return (
    <div className="order-status-page">
      {/* Navigation Bar */}
      <div className="navbar">
        <h1 className="nav-title" onClick={() => navigate("/userhome")}>
          Home
        </h1>
        <button className="logout-btn" onClick={() => alert("Logging Out!")}>
          Logout
        </button>
      </div>

      {/* Heading */}
      <h2 className="order-status-heading">Order Status</h2>

      {/* Order Status Table */}
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price (in Rs)</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.productName}</td>
                <td>{order.productPrice}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatus;
