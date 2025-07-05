// src/WishlistPage.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Link } from "react-router-dom";

function WishlistPage() {
  const [wishlists, setWishlists] = useState([]);
  const [title, setTitle] = useState("");

  const fetchWishlists = async () => {
    const res = await fetch("http://localhost:5000/api/wishlists");
    const data = await res.json();
    setWishlists(data);
  };

  const createWishlist = async () => {
    if (!title) return;
    await fetch("http://localhost:5000/api/wishlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        owner: auth.currentUser?.email || "Unknown",
      }),
    });
    setTitle("");
    fetchWishlists();
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {auth.currentUser?.email}</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New wishlist title"
      />
      <button onClick={createWishlist}>Create Wishlist</button>

      <ul>
        {wishlists.map((w) => (
          <li key={w._id}>
            <Link to={`/wishlists/${w._id}`}>{w.title}</Link> (Owner: {w.owner})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WishlistPage;