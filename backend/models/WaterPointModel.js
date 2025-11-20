import mongoose from "mongoose";

const waterPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  queueStatus: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  coordinates: {
    lat: {
      type: Number,
      required: false,
    },


    lng: {
      type: Number,
      required: false,
    },
  },
  status: {
    type: String,
    enum: ["Open", "Dry", "Broken"],
    default: "Open",
  },


 // ✅ NEW FIELDS:
  isSafe: {
    type: Boolean,
    default: true,
  },
 
reportedIssues: [
  {
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }
],


queueHistory: [
  {
    status: String,
    date: { type: Date, default: Date.now }
  }
],

 // Analytics:
  bestTimeToday: {
    type: String,
    default: null,
  },
  predictedBestTime: {
    type: String,
    default: null,
  },
});


 
export default mongoose.model("WaterPoint", waterPointSchema);
