import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// ADD NEW WATER POINT
router.post("/add", async (req, res) => {
  try {
    const { name, location, lat, lng } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: "Name and location are required" });
    }

    const newPoint = new WaterPoint({
      name,
      location,
      coordinates: {
        lat: lat || null,
        lng: lng || null,
      },
      queueStatus: "Unknown",
      isSafe: true,
      status: "Open",
      reportedIssues: [],
    });

    await newPoint.save();

    res.json({ success: true, message: "Water point added", newPoint });
  } catch (err) {
    console.error("Add water point error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
