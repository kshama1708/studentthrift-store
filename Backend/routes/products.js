import express from "express";
import upload from "../middleware/upload.js";

import {
  addProduct,
  getProducts,
  getMyProducts,
  deleteProduct,
} from "../controllers/productController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);

router.get(
  "/my-products",
  protect,
  getMyProducts
);

router.post(
  "/",
  protect,
  upload.array("images", 5),
  addProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

export default router;