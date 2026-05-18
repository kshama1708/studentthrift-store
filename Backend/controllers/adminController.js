import User from "../models/User.js";
import Product from "../models/Product.js";
import { randomBytes } from "crypto";

// GET /api/admin/stats
export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalSold, activeListings] = await Promise.all([
      User.countDocuments({ role: "student" }),
      Product.countDocuments(),
      Product.countDocuments({ status: "sold" }),
      Product.countDocuments({ status: "active" }),
    ]);

    res.status(200).json({
      success: true,
      stats: { totalUsers, totalProducts, totalSold, activeListings },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "student" }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/users/:id/status  — block or unblock
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body; // "active" | "blocked"
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/admin/products/:id
export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json({ success: true, message: "Product removed." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

