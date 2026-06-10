import User from "../models/User.js";
import Product from "../models/product.js";


// =========================================
// GET DASHBOARD STATS
// =========================================
export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalSold,
      activeListings,
      blockedUsers,
      approvedProducts,
      rejectedProducts,
    ] = await Promise.all([
      User.countDocuments({
        role: "student",
      }),

      Product.countDocuments(),

      Product.countDocuments({
        status: "sold",
      }),

      Product.countDocuments({
        status: "active",
      }),

      User.countDocuments({
        status: "blocked",
      }),

      Product.countDocuments({
        status: "approved",
      }),

      Product.countDocuments({
        status: "rejected",
      }),
    ]);

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalProducts,
        totalSold,
        activeListings,
        blockedUsers,
        approvedProducts,
        rejectedProducts,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// =========================================
// GET ALL USERS
// =========================================
export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find({
      role: "student",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// =========================================
// BLOCK / UNBLOCK USER
// =========================================
export const updateUserStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const user =
      await Product.findByIdAndUpdate(
  req.params.id,
  {
    status: "approved",
  },
  {
    returnDocument: "after",
  }
);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "User status updated.",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// =========================================
// DELETE USER
// =========================================
export const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// =========================================
// GET ALL PRODUCTS
// =========================================
export const getAllProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find()
      .populate(
        "seller",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
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


// =========================================
// APPROVE PRODUCT
// =========================================
export const approveProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          status: "approved",
        },
        {  returnDocument: "after",}
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product approved.",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// =========================================
// REJECT PRODUCT
// =========================================
export const rejectProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found.",
      });
    }

    // UPDATE STATUS
    product.status = "rejected";

    await product.save();

    // SEND NOTIFICATION
    await User.findByIdAndUpdate(
      product.seller,
      {
        $push: {
          notifications: {
            message: `Your product "${product.title}" was rejected by admin.`,
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Product rejected.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================================
// DELETE PRODUCT
// =========================================
export const removeProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Product removed.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};