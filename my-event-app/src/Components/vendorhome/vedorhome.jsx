import React from "react";
import { useNavigate } from "react-router-dom";
import "./vendorhome.css";
import { FaBoxOpen, FaPlusCircle, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";

const VendorHome = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/login/logout/", {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
    logout(); 
    navigate("/"); 
  };

  const handleAddItem = () => {
    navigate("/addnewitem");
  };

  return (
    <div className="vendor-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="nav-title">Welcome Vendor</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Card Section */}
      <div className="card-container">
        <div className="card">
          <FaBoxOpen size={60} />
          <h2>Your Items</h2>
        </div>
        <div className="card" onClick={handleAddItem}>
          <FaPlusCircle size={60} />
          <h2>Add New Item</h2>
        </div>
        <div className="card">
          <FaMoneyBillWave size={60} />
          <h2>Transaction</h2>
        </div>
      </div>
    </div>
  );
};

export default VendorHome;
