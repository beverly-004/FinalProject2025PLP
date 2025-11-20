import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// Clear all issues + mark safe
router.post("/clear/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const wp = await WaterPoint.findById(id);
    if (!wp) return res.status(404).json({ error: "Water point not found" });

    wp.reportedIssues = [];
    wp.isSafe = true; // admin decides it’s safe now
    await wp.save();

    res.json({ success: true, message: "Issues cleared and marked safe", wp });
  } catch (error) {
    console.error("Admin clear error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
