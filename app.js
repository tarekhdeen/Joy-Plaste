import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

export default app;
