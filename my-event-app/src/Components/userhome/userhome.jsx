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

const UserHome = () => {
  const [showVendorOptions, setShowVendorOptions] = useState(false);

  return (
    <div className="user-home">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="nav-title">Welcome User</h1>
        <button className="logout-btn">Logout</button>
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
              <div className="vendor-option">
                <FaUtensils /> Catering
              </div>
              <div className="vendor-option">
                <FaLeaf /> Florist
              </div>
              <div className="vendor-option">
                <FaPalette /> Decoration
              </div>
              <div className="vendor-option">
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
