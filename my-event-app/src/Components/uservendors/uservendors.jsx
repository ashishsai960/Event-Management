import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./uservendors.css";

const vendors = [
  { id: 1, name: "Flora Bloom", contact: "+123 456 7890" },
  { id: 2, name: "Green Petals", contact: "+987 654 3210" },
  { id: 3, name: "Elegant Roses", contact: "+456 123 7890" },
];

const UserVendors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedVendor = location.state?.vendor || "Unknown";
  const handleVendorClick = (vendorName) => {
    navigate("/vendor-products", { state: { vendor: vendorName } });
  };
  return (
    <div className="user-vendors-container">
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

      {/* Page Heading */}
      <h1 className="vendor-heading">Vendor - {selectedVendor}</h1>

      {/* Vendor Cards */}
      <div className="vendors-list">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="vendor-card"
            onClick={() => handleVendorClick(vendor.name)}
          >
            <div>
              <h3>{vendor.name}</h3>
              <p>Contact: {vendor.contact}</p>
            </div>
            <button className="shop-btn">Shop Items</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserVendors;
