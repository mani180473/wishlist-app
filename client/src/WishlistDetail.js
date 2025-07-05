// src/WishlistDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "./firebase";
import './App.css';

const EMOJIS = ["👍", "🎁", "❤️"];

function WishlistDetail() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [product, setProduct] = useState({ name: "", image: "", price: "" });
  const [comment, setComment] = useState("");
  const [invitedEmail, setInvitedEmail] = useState("");

  const fetchWishlist = async () => {
    const res = await fetch(`http://localhost:5000/api/wishlists/${id}`);
    const data = await res.json();
    setWishlist(data);
  };

  const addProduct = async () => {
    await fetch(`http://localhost:5000/api/wishlists/${id}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        addedBy: auth.currentUser?.email || "Unknown",
        timestamp: new Date().toISOString(),
        reactions: {},
        comments: [],
      }),
    });
    setProduct({ name: "", image: "", price: "" });
    fetchWishlist();
  };

  const deleteProduct = async (productId) => {
    await fetch(`http://localhost:5000/api/wishlists/${id}/products/${productId}`, {
      method: "DELETE",
    });
    fetchWishlist();
  };

  const handleEmojiReact = (productIdx, emoji) => {
    const updatedProducts = [...wishlist.products];
    const currentUser = auth.currentUser?.email || "guest";
    const reactions = updatedProducts[productIdx].reactions || {};
    reactions[emoji] = reactions[emoji] ? [...new Set([...reactions[emoji], currentUser])] : [currentUser];
    updatedProducts[productIdx].reactions = reactions;
    setWishlist({ ...wishlist, products: updatedProducts });
  };

  const addComment = (productIdx) => {
    const updatedProducts = [...wishlist.products];
    updatedProducts[productIdx].comments = [
      ...(updatedProducts[productIdx].comments || []),
      {
        text: comment,
        author: auth.currentUser?.email || "guest",
        time: new Date().toLocaleString(),
      },
    ];
    setComment("");
    setWishlist({ ...wishlist, products: updatedProducts });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="container">
      <div className="wishlist-cover">
        <h2>{wishlist?.title}</h2>
        <p>Created by: {wishlist?.createdBy || "Unknown"}</p>
      </div>

      <div className="invite-section">
        <h3>Invite a friend</h3>
        <input
          placeholder="Email"
          value={invitedEmail}
          onChange={(e) => setInvitedEmail(e.target.value)}
        />
        {invitedEmail && <p className="invite-msg">✅ Invitation sent to {invitedEmail}</p>}
      </div>

      <h3>Add Product</h3>
      <input
        placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        placeholder="Image URL"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />
      <input
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <button onClick={addProduct}>Add</button>

      <h3>Products</h3>
      <ul>
        {wishlist?.products?.map((p, idx) => (
          <li key={idx} className="product-card">
            <img src={p.image} alt={p.name} />
            <div className="product-details">
              <strong>{p.name}</strong> - ₹{p.price}<br />
              <small>Added by: {p.addedBy || "Unknown"} · {new Date(p.timestamp).toLocaleString()}</small>
            </div>

            <div className="reactions">
              {EMOJIS.map((emoji) => (
                <button key={emoji} onClick={() => handleEmojiReact(idx, emoji)}>
                  {emoji} {p.reactions?.[emoji]?.length || 0}
                </button>
              ))}
            </div>

            <div className="comments">
              <input
                placeholder="Add comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={() => addComment(idx)}>Comment</button>
              <ul>
                {p.comments?.map((c, i) => (
                  <li key={i}><strong>{c.author}</strong>: {c.text} <em>({c.time})</em></li>
                ))}
              </ul>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteProduct(p._id)}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WishlistDetail;
