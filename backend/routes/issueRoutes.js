
import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

router.post("/report/:id", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Issue message is required" });
    }

    const wp = await WaterPoint.findById(req.params.id);
    if (!wp) {
      return res.status(404).json({ error: "Water point not found" });
    }

    // Save a new issue object
    wp.reportedIssues.push({
      message,
      date: new Date(),
    });

    // Automatically mark unsafe
    wp.isSafe = false;

    await wp.save();

    res.json({ success: true, message: "Issue reported!", wp });

  } catch (error) {
    console.error("Issue report error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;


