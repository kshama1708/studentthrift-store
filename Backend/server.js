import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/admin.js";
import orderRoutes from "./routes/order.js";




dotenv.config();
connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Middleware ────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded product images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/uploads",
  express.static("uploads")
);
// ── Routes ───────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders",orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "🌿 Student Thrift Store API is running!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global error handler
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});