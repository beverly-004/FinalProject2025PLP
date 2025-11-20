import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      name,
      location,
      lat,
      lng,
      queueStatus,
      isSafe
    } = req.body;

    const newWP = new WaterPoint({
      name,
      location,
      queueStatus,
      isSafe,
      coordinates: { lat, lng }
    });

    await newWP.save();

    res.json({ message: "Water point added successfully", newWP });
  } catch (error) {
    console.error("Add water point error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
