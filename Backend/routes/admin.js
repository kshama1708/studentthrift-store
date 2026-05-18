import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  getAllProducts,
  removeProduct,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly); // all admin routes require auth + admin role

router.get("/stats", getDashboardStats);

router.get("/users", getAllUsers);
router.put("/users/:id/status", updateUserStatus);

router.get("/products", getAllProducts);
router.delete("/products/:id", removeProduct);



export default router;
