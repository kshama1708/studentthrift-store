import Product from "../models/product.js";

// ADD PRODUCT
export const addProduct = async (
  req,
  res
) => {
  try {
    const {
  title,
  description,
  category,
  price,
  address,
} = req.body;

    const images = req.files
      ? req.files.map(
          (file) => file.path
        )
      : [];

    const product =
      await Product.create({
        title,
        description,
        price,
        category,
        address,
        images,
        seller: req.user._id,
      });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// GET ALL PRODUCTS

export const getProducts = async (
  req,
  res
) => {
  try {

    const products =
     await Product.find({
  status: "approved",
})
        .populate(
          "seller",
          "name email address"
        );

    res.json({
      success: true,
      products,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// GET MY PRODUCTS
export const getMyProducts = async (
  req,
  res
) => {

  try {

    const products = await Product.find({
      seller: req.user._id,
    }).populate("seller", "name email");

    res.json({
      success: true,
      products,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req,
  res
) => {
  try {

    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only owner can delete
    if (
      product.seller.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};