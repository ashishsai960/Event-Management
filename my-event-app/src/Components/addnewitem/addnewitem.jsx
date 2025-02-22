import React, { useState } from "react";
import "./addnewitem.css";

const AddNewItem = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productImage: null,
    imagePreview: null,
  });

  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setFormData({
        ...formData,
        productImage: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      alert("Only JPG, JPEG, and PNG files are allowed.");
      e.target.value = null;
      setFormData({ ...formData, productImage: null, imagePreview: null });
    }
  };

  // Add new item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.productName ||
      !formData.productPrice ||
      !formData.productImage
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const newItem = {
      id: items.length + 1,
      name: formData.productName,
      price: formData.productPrice,
      image: formData.imagePreview,
    };

    setItems([...items, newItem]);
    setFormData({
      productName: "",
      productPrice: "",
      productImage: null,
      imagePreview: null,
    });
  };

  // Open Edit Modal
  const handleEdit = (item) => {
    setEditData({
      id: item.id,
      productName: item.name,
      productPrice: item.price,
      imagePreview: item.image,
      productImage: null,
    });
    setShowModal(true);
  };

  // Handle Delete Function
  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  // Handle File Change in Modal
  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setEditData({
        ...editData,
        productImage: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      alert("Only JPG, JPEG, and PNG files are allowed.");
      e.target.value = null;
    }
  };

  // Handle Update in Modal
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedItems = items.map((item) =>
      item.id === editData.id
        ? {
            id: editData.id,
            name: editData.productName,
            price: editData.productPrice,
            image: editData.imagePreview,
          }
        : item
    );
    setItems(updatedItems);
    setShowModal(false);
  };

  return (
    <div className="add-item-container">
      <div className="navbar">
        <h2 className="nav-title">Vendor Panel</h2>
        <div className="nav-buttons">
          <button className="view-btn">View Items</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="content-container">
        <div className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="productPrice"
              placeholder="Product Price"
              value={formData.productPrice}
              onChange={handleChange}
              required
            />
            <label htmlFor="file-upload" className="custom-file-upload">
              Choose Image
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
              required
            />
            {formData.imagePreview && (
              <div className="image-preview">
                <img src={formData.imagePreview} alt="Preview" />
              </div>
            )}
            <button type="submit" className="add-btn">
              Add Item
            </button>
          </form>
        </div>

        <div className="table-section">
          <h2>Product List</h2>
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th className="left-align">Product Name</th>
                <th className="left-align">Product Price (in Rs)</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-img"
                    />
                  </td>
                  <td className="left-align">{item.name}</td>
                  <td className="left-align">{item.price}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", color: "#888" }}
                  >
                    No products added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="productName"
                value={editData.productName}
                onChange={(e) =>
                  setEditData({ ...editData, productName: e.target.value })
                }
                required
              />
              <input
                type="number"
                name="productPrice"
                value={editData.productPrice}
                onChange={(e) =>
                  setEditData({ ...editData, productPrice: e.target.value })
                }
                required
              />
              <label htmlFor="edit-file-upload" className="edit-file-upload">
                Choose Image
              </label>
              <input
                type="file"
                id="edit-file-upload"
                accept=".jpg, .jpeg, .png"
                onChange={handleEditFileChange}
              />
              {editData.imagePreview && (
                <div className="image-preview">
                  <img src={editData.imagePreview} alt="Preview" />
                </div>
              )}
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewItem;
