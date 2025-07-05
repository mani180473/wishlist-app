// src/LoginPage.js
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";
import './App.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/wishlists");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🎁 Wishlist Hub</h1>
        <p>Plan, share, and shop together</p>
        <button className="google-btn" onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
