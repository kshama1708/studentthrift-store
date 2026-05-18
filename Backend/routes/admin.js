import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  getAllProducts,
  removeProduct,
  approveProduct,
  rejectProduct,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly); // all admin routes require auth + admin role

router.get("/stats", getDashboardStats);

router.get("/users", getAllUsers);
router.put("/users/:id/status", updateUserStatus);

router.get("/products", getAllProducts);
router.put(
  "/products/:id/approve",
  approveProduct
);

router.put(
  "/products/:id/reject",
  rejectProduct
);

router.delete(
  "/products/:id",
  removeProduct
);

router.delete(
  "/users/:id",
  deleteUser
);

export default router;
