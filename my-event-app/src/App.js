import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/login/login";
import Signup from "./Components/signup/signup";
import Vendorhome from "./Components/vendorhome/vedorhome";
import Addnewitem from "./Components/addnewitem/addnewitem";
import Userhome from "./Components/userhome/userhome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendorhome" element={<Vendorhome />} />
        <Route path="/addnewitem" element={<Addnewitem />} />
        <Route path="/userhome" element={<Userhome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
