import mongoose from "mongoose";

const queueReportSchema = new mongoose.Schema({
  waterPointId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WaterPoint",
    required: true,
  },
  crowdLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("QueueReport", queueReportSchema);
