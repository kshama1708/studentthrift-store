import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post(
  "/place-order",
  async (req, res) => {

    try {

      const { items } = req.body;

      console.log(items);

      for (const item of items) {

        await Product.findByIdAndUpdate(
          item._id,
          {
            isSold: true,
          }
        );
      }

      res.json({
        success: true,
        message: "Order placed",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default router;