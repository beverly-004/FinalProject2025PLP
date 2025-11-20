
import express from "express";
import WaterPoint from "../models/WaterPointModel.js";
import { generatePredictions } from "../utils/predictQueue.js";

const router = express.Router();

// Update queue status + generate predictions
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Low", "Medium", "High"].includes(status)) {
      return res.status(400).json({ error: "Invalid queue status" });
    }

    const wp = await WaterPoint.findById(id);
    if (!wp) return res.status(404).json({ error: "Water point not found" });

    // ------------------------------
    // 1. Save today's queue update
    // ------------------------------
    wp.queueStatus = status;
    wp.lastUpdated = Date.now();

    // ------------------------------
    // 2. Add to queue history
    // ------------------------------
    wp.queueHistory = wp.queueHistory || [];
    wp.queueHistory.push({
      status,
      date: new Date()
    });

    // Keep last 20 entries only
    if (wp.queueHistory.length > 20) {
      wp.queueHistory = wp.queueHistory.slice(-20);
    }

    // ------------------------------
    // 3. Generate prediction
    // ------------------------------
    const { bestToday, predicted } = generatePredictions(
      status,
      wp.queueHistory
    );

    wp.bestTimeToday = bestToday;
    wp.predictedBestTime = predicted;

    // Save all updates
    await wp.save();

    res.json({
      success: true,
      message: "Queue updated with predictions",
      wp
    });

  } catch (error) {
    console.error("Queue update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
