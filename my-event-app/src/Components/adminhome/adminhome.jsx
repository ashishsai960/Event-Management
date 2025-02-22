import React, { useState } from "react";
import "./adminhome.css";
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div className="admin-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title">Welcome Admin</h1>
        <button className="logout-btn">Logout</button>
      </nav>

      {/* Tab Buttons */}
      <div className="tabs">
        <button
          className={activeTab === "user" ? "active" : ""}
          onClick={() => setActiveTab("user")}
        >
          Maintain User
        </button>
        <button
          className={activeTab === "vendor" ? "active" : ""}
          onClick={() => setActiveTab("vendor")}
        >
          Maintain Vendor
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "user" ? (
          <div className="user-section">
            <h3>User Section</h3>
            <div className="admin-options">
              <div className="option-card">
                <h3>Membership</h3>
                <button className="action-btn">Add</button>
                <button className="action-btn">Update</button>
              </div>
              <div className="option-card">
                <h3>User Management</h3>
                <button className="action-btn">Add</button>
                <button className="action-btn">Update</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="vendor-section">
            <h3>Vendor Section</h3>
            <div className="admin-options">
              <div className="option-card">
                <h3>Membership</h3>
                <button className="action-btn">Add</button>
                <button className="action-btn">Update</button>
              </div>
              <div className="option-card">
                <h3>Vendor Management</h3>
                <button className="action-btn">Add</button>
                <button className="action-btn">Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
