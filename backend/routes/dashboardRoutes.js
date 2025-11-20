import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// Dashboard route - returns all water points with analytics
router.get("/", async (req, res) => {
  try {
    const waterPoints = await WaterPoint.find();

    res.json( waterPoints.map((wp) => ({
        _id: wp._id,
        name: wp.name,
        location: wp.location,
        queueStatus: wp.queueStatus,
        isSafe: wp.isSafe,
        bestTimeToday: wp.bestTimeToday||"Not available",
        predictedBestTime: wp.predictedBestTime||"Not available",
        issueCount: wp.reportedIssues.length,

        
        // ⭐ CRITICAL — send coordinates to the frontend!
        coordinates: wp.coordinates

      }))
    );
  } catch (error) {
    console.error("Dashboard API error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
