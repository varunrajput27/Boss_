import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";-+

dotenv.config();
const app = express();

// 🟡 Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://bossexpertfrontend.vercel.app",
  "http://localhost:5174",
  "https://bossexpertadmin.vercel.app"
];

// ✅ CORS middleware (add only ONCE, at top)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder for uploads
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRouter);

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));
