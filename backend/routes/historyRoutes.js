import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// Get full issue history for a water point
router.get("/:id", async (req, res) => {
  try {
    const wp = await WaterPoint.findById(req.params.id);

    if (!wp) {
      return res.status(404).json({ error: "Water point not found" });
    }

    res.json({
      name: wp.name,
      location: wp.location,
      issues: wp.reportedIssues || [],
    });

  } catch (error) {
    console.error("Issue history error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
