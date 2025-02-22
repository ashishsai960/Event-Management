import React, { useState } from "react";
import {
  FaUtensils,
  FaLeaf,
  FaUsers,
  FaClipboardList,
  FaConciergeBell,
  FaLightbulb,
  FaPalette,
} from "react-icons/fa";
import "./userhome.css";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [showVendorOptions, setShowVendorOptions] = useState(false);
  const { logout } = useAuth();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/login/logout/",
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } catch (error) {
      console.error("Error during logout:", error);
    }
    logout();
    navigate("/");
  };

  const handleVendorSelect = (vendor) => {
    navigate("/user-vendors", { state: { vendor } });
  };

  return (
    <div className="user-home">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="nav-title">Welcome User</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <div className="nav-btns">
          <button className="cart-btn" onClick={() => navigate("/cart")}>
            Cart
          </button>
          <button className="logout-btn" onClick={() => alert("Logging Out!")}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="cards-container">
        {/* Vendor Card */}
        <div
          className="card"
          onClick={() => setShowVendorOptions(!showVendorOptions)}
        >
          <FaConciergeBell className="card-icon" />
          <h3>Vendor</h3>

          {/* Expanding Options Inside Vendor Card */}
          {showVendorOptions && (
            <div className="vendor-options">
              <div
                className="vendor-option"
                onClick={() => handleVendorSelect("Catering")}
              >
                <FaUtensils /> Catering
              </div>
              <div
                className="vendor-option"
                onClick={() => handleVendorSelect("Florist")}
              >
                <FaLeaf /> Florist
              </div>
              <div
                className="vendor-option"
                onClick={() => handleVendorSelect("Decoration")}
              >
                <FaPalette /> Decoration
              </div>
              <div
                className="vendor-option"
                onClick={() => handleVendorSelect("Lighting")}
              >
                <FaLightbulb /> Lighting
              </div>
            </div>
          )}
        </div>

        {/* Florist Card */}
        <div className="card">
          <FaLeaf className="card-icon" />
          <h3>Florist</h3>
        </div>

        {/* Guest List Card */}
        <div className="card">
          <FaUsers className="card-icon" />
          <h3>Guest List</h3>
        </div>

        {/* Order Status Card */}
        <div className="card">
          <FaClipboardList className="card-icon" />
          <h3>Order Status</h3>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
