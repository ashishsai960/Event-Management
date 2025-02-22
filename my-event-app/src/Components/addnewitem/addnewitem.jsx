import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import "./addnewitem.css";

const AddNewItem = () => {
  const { accessToken } = useAuth(); // Get Auth Token
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productImage: null,
    imagePreview: null,
  });

  const [items, setItems] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Fetch vendor's products on mount
  useEffect(() => {
    fetchProducts();
  }, [accessToken]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/product/my-products/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle file selection
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

  // 🔹 Add new item (API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.productPrice || !formData.productImage) {
      alert("Please fill in all fields!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.productName);
    formDataToSend.append("price", formData.productPrice);
    formDataToSend.append("image", formData.productImage);

    try {
      await axios.post("http://127.0.0.1:8000/api/product/add/", formDataToSend, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
      });

      fetchProducts(); // Refresh products
      setFormData({ productName: "", productPrice: "", productImage: null, imagePreview: null });

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // 🔹 Open Edit Modal
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

  // 🔹 Handle delete request
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/${id}/delete/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      fetchProducts(); // Refresh products
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔹 Handle file change in Edit Modal
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

  // 🔹 Handle update in Edit Modal
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToUpdate = new FormData();
    formDataToUpdate.append("name", editData.productName);
    formDataToUpdate.append("price", editData.productPrice);
    if (editData.productImage) {
      formDataToUpdate.append("image", editData.productImage);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/product/${editData.id}/update/`, formDataToUpdate, {
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" },
      });

      fetchProducts(); // Refresh products
      setShowModal(false);

    } catch (error) {
      console.error("Error updating product:", error);
    }
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
        {/* Left Panel - Add Product */}
        <div className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="productName" placeholder="Product Name" onChange={handleChange} required />
            <input type="number" name="productPrice" placeholder="Product Price" onChange={handleChange} required />
            <label htmlFor="file-upload" className="custom-file-upload">Choose Image</label>
            <input type="file" id="file-upload" accept=".jpg, .jpeg, .png" onChange={handleFileChange} required />
            {formData.imagePreview && <div className="image-preview"><img src={formData.imagePreview} alt="Preview" /></div>}
            <button type="submit" className="add-btn">Add Item</button>
          </form>
        </div>

        {/* Right Panel - Product List */}
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
                  <td><img src={item.image} alt={item.name} className="product-img" /></td>
                  <td className="left-align">{item.name}</td>
                  <td className="left-align">{item.price}</td>
                  <td>
                    <button className="update-btn" onClick={() => handleEdit(item)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan="4" style={{ textAlign: "center", color: "#888" }}>No products added yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
              <input type="text" name="productName" value={editData.productName} onChange={(e) => setEditData({ ...editData, productName: e.target.value })} required />
              <input type="number" name="productPrice" value={editData.productPrice} onChange={(e) => setEditData({ ...editData, productPrice: e.target.value })} required />
              <label htmlFor="edit-file-upload" className="edit-file-upload">Choose Image</label>
              <input type="file" id="edit-file-upload" accept=".jpg, .jpeg, .png" onChange={handleEditFileChange} />
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewItem;
