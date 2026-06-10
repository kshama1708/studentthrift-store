import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    items: req.body.items,
    paymentMethod: req.body.paymentMethod,
  });

  // mark product as SOLD
  for (let item of req.body.items) {
    await Product.findByIdAndUpdate(item.productId, {
      status: "sold",
    });
  }

  res.json(order);
};