import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login/login";
import Signup from "./Components/signup/signup";
import { AuthProvider } from "./Components/Auth/AuthContext";
import Vendorhome from "./Components/vendorhome/vedorhome";
import Addnewitem from "./Components/addnewitem/addnewitem";
import Userhome from "./Components/userhome/userhome";
import Uservendor from "./Components/uservendors/uservendors";
import Vendorproducts from "./Components/vendorproducts/vendorproducts";
import Cart from "./Components/cart/cart";
import Checkout from "./Components/checkout/checkout";
import Adminhome from "./Components/adminhome/adminhome";
import Vendorstatus from "./Components/vendorstatus/vendorstatus";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/vendorhome" element={<Vendorhome />} />
          <Route path="/addnewitem" element={<Addnewitem />} />
          <Route path="/userhome" element={<Userhome />} />
          <Route path="/user-vendors" element={<Uservendor />} />
          <Route path="/vendor-products" element={<Vendorproducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/vendorstatus" element={<Vendorstatus />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
