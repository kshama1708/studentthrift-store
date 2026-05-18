import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, college } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const user = await User.create({
  name,
  email,
  password,
});
    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    if (user.status === "blocked") {
      return res.status(403).json({ success: false, message: "Your account has been blocked. Contact admin." });
    }

    sendToken(user, 200, res);
  } catch (err) {

  console.log("========== REGISTER ERROR ==========");

  console.log(err);

  console.log(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });

  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist", "title price emoji category");
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/auth/update-profile
export const updateProfile = async (req, res) => {
  try {
    const { name, college } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, college },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/auth/change-password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
  } catch (err) {
  console.log("FULL ERROR:");
  console.log(err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
}


};
