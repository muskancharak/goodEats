import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import express from "express";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT;

// ✅ Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("Serving uploads from:", path.join(__dirname, "uploads"));

// ✅ Serve general static files (optional)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
app.use("/api", routes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
