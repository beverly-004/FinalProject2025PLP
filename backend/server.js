

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


import waterRoutes from "./routes/waterRoutes.js";
//import queueRoutes from "./routes/queueRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import queueStatusRoutes from "./routes/queueStatusRoutes.js";

import waterPointRoutes from "./routes/waterPointRoutes.js";


import adminAddRoutes from "./routes/adminAddRoutes.js";







// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Debug: print the loaded value
console.log(" MONGO_URI from env:", process.env.MONGO_URI);


// Create express app BEFORE using it
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//  Mount routes AFTER app is defined
app.use("/api/waterpoints", waterRoutes);
//app.use("/api/queue", queueRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/queue", queueStatusRoutes);
app.use("/api/waterpoints", waterPointRoutes);
app.use("/api/admin", adminAddRoutes);



// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

