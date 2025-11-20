import mongoose from "mongoose";
import dotenv from "dotenv";
import WaterPoint from "./models/WaterPointModel.js";

dotenv.config({ path: "./.env" });

// Water points with real coordinates
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


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await WaterPoint.deleteMany(); // Clear existing data
    console.log("Old water points removed");

    await WaterPoint.insertMany(waterPoints);
    console.log("New water points inserted successfully!");

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();
