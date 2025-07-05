// src/App.js
import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import WishlistPage from "./WishlistPage";
import WishlistDetail from "./WishlistDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/wishlists" element={<WishlistPage />} />
        <Route path="/wishlists/:id" element={<WishlistDetail />} />
      </Routes>
    </Router>
  );
}

export default App;