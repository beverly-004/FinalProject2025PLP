import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// ✅ Get all water points
router.get("/", async (req, res) => {
  try {
    const points = await WaterPoint.find();
    res.json(points);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new water point
router.post("/", async (req, res) => {
  try {
    const { name, location, coordinates, status } = req.body;
    const newWaterPoint = new WaterPoint({ name, location, coordinates, status });
    await newWaterPoint.save();
    res.status(201).json(newWaterPoint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update water point (queue status, etc.)
router.put("/:id", async (req, res) => {
  try {
    const updated = await WaterPoint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;



// ✅ Report safety or condition issue for a water point
router.post("/report-issue", async (req, res) => {
  try {
    const { waterPointId, isSafe, reportedIssues, status } = req.body;

    const updated = await WaterPoint.findByIdAndUpdate(
      waterPointId,
      {
        isSafe,
        reportedIssues,
        status,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Water point not found" });

    res.json({
      message: "Issue reported successfully",
      updatedWaterPoint: updated,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
