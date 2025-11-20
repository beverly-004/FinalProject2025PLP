import express from "express";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// SEED DATA
const waterPoints = [
  {
    name: "Community Borehole A",
    location: "Central Village",
    queueStatus: "High",
    isSafe: true,
    coordinates: { lat: -1.3167, lng: 36.8333 }
  },
  {
    name: "Nairobi CBD Borehole",
    location: "Nairobi Central",
    queueStatus: "Low",
    isSafe: true,
    coordinates: { lat: -1.286389, lng: 36.817223 }
  },
  {
    name: "Kibera Community Tap",
    location: "Kibera",
    queueStatus: "High",
    isSafe: false,
    coordinates: { lat: -1.3150, lng: 36.7830 }
  },
  {
    name: "Githurai Borehole",
    location: "Githurai 44",
    queueStatus: "Medium",
    isSafe: true,
    coordinates: { lat: -1.2000, lng: 36.9350 }
  },
  {
    name: "Githurai Public Tap",
    location: "Githurai 44, Nairobi",
    queueStatus: "Medium",
    isSafe: true,
    coordinates: { lat: -1.2060, lng: 36.9050 }
  },
  {
    name: "Kayole Borehole",
    location: "Kayole, Nairobi",
    queueStatus: "Low",
    isSafe: false,
    coordinates: { lat: -1.2845, lng: 36.9006 }
  },
  {
    name: "Pipeline Water Point",
    location: "Pipeline, Nairobi",
    queueStatus: "High",
    isSafe: false,
    coordinates: { lat: -1.3162, lng: 36.9005 }
  },
  {
    name: "Umoja Tap Station",
    location: "Umoja, Nairobi",
    queueStatus: "Low",
    isSafe: true,
    coordinates: { lat: -1.2789, lng: 36.8796 }
  }
];

router.get("/seed", async (req, res) => {
  try {
    await WaterPoint.deleteMany();
    await WaterPoint.insertMany(waterPoints);

    res.status(200).json({
      message: "Database seeded successfully!",
      inserted: waterPoints.length
    });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

export default router;
