import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./vendorproducts.css";

const productsData = {
  "Flora Bloom": [
    {
      id: 1,
      name: "Red Roses",
      price: "$10",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Orchids",
      price: "$15",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Lilies",
      price: "$12",
      image: "https://via.placeholder.com/100",
    },
  ],
  "Green Petals": [
    {
      id: 4,
      name: "Tulips",
      price: "$14",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      name: "Sunflowers",
      price: "$8",
      image: "https://via.placeholder.com/100",
    },
  ],
  "Elegant Roses": [
    {
      id: 6,
      name: "Daisies",
      price: "$9",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 7,
      name: "Lavender",
      price: "$13",
      image: "https://via.placeholder.com/100",
    },
  ],
};

const VendorProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorName = location.state?.vendor || "Unknown Vendor";
  const products = productsData[vendorName] || [];

  return (
    <div className="vendor-products-container">
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

      {/* Vendor Name Heading */}
      <h1 className="vendor-heading">Vendor - {vendorName}</h1>

      {/* Products Section */}
      <div className="products-section">
        <h2 className="products-title">Products</h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th className="left-align">Name</th>
              <th className="left-align">Price</th>
              <th className="small-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td className="left-align">{product.name}</td>
                <td className="left-align">{product.price}</td>
                <td className="small-column">
                  <button className="add-to-cart-btn">Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorProducts;
