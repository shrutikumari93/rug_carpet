import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { protect } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order (called before opening payment popup)
router.post("/create-order", protect, async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const options = {
      amount: Math.round(amount * 100), // Razorpay wants paise (amount x 100)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
});

// Verify payment signature (called after payment success)
router.post("/verify", protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;