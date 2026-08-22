import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// ---------- INTERESTS ----------

// PUT update interests (replace full list)
router.put("/interests", protect, async (req, res) => {
  try {
    const { interests } = req.body; // array of category names/ids
    const user = await User.findById(req.user._id);
    user.interests = interests;
    await user.save();
    res.json({ interests: user.interests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET current interests
router.get("/interests", protect, async (req, res) => {
  res.json({ interests: req.user.interests });
});

// ---------- WISHLIST ----------

// POST add product to wishlist
router.post("/wishlist/:productId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { productId } = req.params;
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remove product from wishlist
router.delete("/wishlist/:productId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.productId);
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET wishlist (populated with product details)
router.get("/wishlist", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------- ORDERS ----------

// POST create a new order
router.post("/orders", protect, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET order history for logged-in user
router.get("/orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------- ADMIN: VIEW ALL CUSTOMER INTERESTS ----------

router.get("/all-interests", protect, admin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("name email interests wishlist")
      .populate("wishlist", "name price");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ---------- ADMIN: VIEW & MANAGE ALL ORDERS ----------

router.get("/all-orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/orders/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
