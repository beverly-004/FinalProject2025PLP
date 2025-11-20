
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Route imports
import waterRoutes from "./routes/waterRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import queueStatusRoutes from "./routes/queueStatusRoutes.js";
import waterPointRoutes from "./routes/waterPointRoutes.js";
import adminAddRoutes from "./routes/adminAddRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";



// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env properly (IMPORTANT for Render)
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debug log
console.log(" MONGO_URI from env:", process.env.MONGO_URI);

// Create Express app
const app = express();

// CORS — allow Vercel frontend + local dev
app.use(
  cors({
    origin: [
      "https://final-project2025-plp.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// ROUTES — clean, organized, NO duplicates
app.use("/api/waterpoints", waterRoutes);
app.use("/api/waterpoints", waterPointRoutes);

app.use("/api/admin", seedRoutes);


app.use("/api/dashboard", dashboardRoutes);

app.use("/api/issues", issueRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminAddRoutes);

app.use("/api/queue", queueStatusRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
