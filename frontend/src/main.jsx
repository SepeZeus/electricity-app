import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Comparing from "./Pages/Comparing.jsx";
import ProofOfConcept from "./Pages/ProofOfConcept.jsx";
import Register from "./Pages/Register.jsx";
import Profile from "./Pages/Profile.jsx";
import Navbar from "../components/navbar.jsx";
import React, { useState } from "react";
import Terms from "./Pages/Terms.jsx";
import Footer from "../components/Footer.jsx";

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("authenticated") || false
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("authenticated");
  };

  console.log("Testi");

  return (
    <BrowserRouter>
      <nav className="navbar-container">
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      </nav>
      <div className="background-container"></div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comparing" element={<Comparing />} />
        <Route path="/proof" element={<ProofOfConcept />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <div className="footer">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
