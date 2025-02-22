import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./signup.css";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    userID: "",
    password: "",
    userType: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: formData.userID, // Backend expects 'username', not 'userID'
      email: formData.email,
      password: formData.password,
      user_type: formData.userType,
      category: formData.userType === "vendor" ? formData.category : "",
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/register/", userData);
      console.log("response from backend: ", response.data)

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in!",
      });

      // Redirect to login after successful signup
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.response?.data?.message || "An error occurred during signup.",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="userID"
            placeholder="UserID"
            value={formData.userID}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="">User Type</option>
            <option value="admin">Admin</option>
            <option value="vendor">Vendor</option>
            <option value="user">User</option>
          </select>
          {formData.userType === "vendor" && (
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Category</option>
              <option value="catering">Catering</option>
              <option value="florist">Florist</option>
              <option value="decoration">Decoration</option>
              <option value="lighting">Lighting</option>
              <option value="dj">DJ</option>
            </select>
          )}
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
