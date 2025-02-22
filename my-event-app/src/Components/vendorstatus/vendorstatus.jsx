import React, { useState } from "react";
import "./vendorstatus.css";

const VendorStatus = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Vendor 1",
      email: "vendor1@example.com",
      address: "123 Main St",
      status: "Received",
    },
    {
      id: 2,
      name: "Vendor 2",
      email: "vendor2@example.com",
      address: "456 Market St",
      status: "Ready for Shipping",
    },
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Open the status update pop-up
  const openUpdatePopup = (vendor) => {
    setSelectedVendor(vendor);
    setNewStatus(vendor.status); // Default selected value
  };

  // Handle updating the status
  const handleUpdate = () => {
    if (selectedVendor) {
      setVendors(
        vendors.map((v) =>
          v.id === selectedVendor.id ? { ...v, status: newStatus } : v
        )
      );
      setSelectedVendor(null); // Close the modal
    }
  };

  // Handle deleting a vendor
  const handleDelete = (id) => {
    setVendors(vendors.filter((v) => v.id !== id));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1 className="nav-title">Home</h1>
        <button className="logout-btn">Logout</button>
      </div>

      {/* Product Status Heading */}
      <h2 className="page-heading">Product Status</h2>

      {/* Vendor Status Table */}
      <div className="table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.address}</td>
                <td>{vendor.status}</td>
                <td className="actions-column">
                  <button
                    className="update-btn"
                    onClick={() => openUpdatePopup(vendor)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(vendor.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Update Pop-up */}
      {selectedVendor && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Update Status</h3>
            <label>
              <input
                type="radio"
                value="Received"
                checked={newStatus === "Received"}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              Received
            </label>
            <label>
              <input
                type="radio"
                value="Ready for Shipping"
                checked={newStatus === "Ready for Shipping"}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              Ready for Shipping
            </label>
            <label>
              <input
                type="radio"
                value="Out for Delivery"
                checked={newStatus === "Out for Delivery"}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              Out for Delivery
            </label>
            <button className="popup-update-btn" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="popup-close-btn"
              onClick={() => setSelectedVendor(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorStatus;
