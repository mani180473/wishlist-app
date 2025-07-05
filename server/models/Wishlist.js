const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  addedBy: String,
  addedAt: Date,
});

const WishlistSchema = new mongoose.Schema({
  title: String,
  owner: String,
  products: [ProductSchema],
  createdAt: Date,
});

module.exports = mongoose.model("Wishlist", WishlistSchema);