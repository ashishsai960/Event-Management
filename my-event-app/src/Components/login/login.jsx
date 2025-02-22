import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2"; 
import "./login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/login/login/", formData);
      
      login(data); // Store user & tokens in AuthContext

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome!",
      });

      switch (data.user_type) {
        case "vendor":
          navigate("/vendorhome");
          break;
        case "customer":
          navigate("/userhome");
          break;
        default:
          navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials!",
      });
    }
  };

  return (
    <div className="form-container">
      <div className="heading">
        <h1>Event Management System</h1>
      </div>
      <div className="form-box">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
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
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
