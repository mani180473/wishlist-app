const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Wishlist = require("./models/Wishlist");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wishlistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get("/api/wishlists", async (req, res) => {
  const wishlists = await Wishlist.find();
  res.json(wishlists);
});

app.get("/api/wishlists/:id", async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  res.json(wishlist);
});

app.post("/api/wishlists", async (req, res) => {
  const wishlist = new Wishlist({ ...req.body, createdAt: new Date() });
  await wishlist.save();
  res.status(201).json(wishlist);
});

app.post("/api/wishlists/:id/products", async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  wishlist.products.push({ ...req.body, addedAt: new Date() });
  await wishlist.save();
  res.status(201).json(wishlist);
});
app.delete('/api/wishlists/:wishlistId/products/:productId', async (req, res) => {
  const { wishlistId, productId } = req.params;
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).send("Wishlist not found");

    wishlist.products = wishlist.products.filter(p => p._id.toString() !== productId);
    await wishlist.save();

    res.status(200).send("Product deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
