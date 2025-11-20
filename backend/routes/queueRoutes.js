import express from "express";
import mongoose from "mongoose";
import QueueReport from "../models/QueueReport.js";
import WaterPoint from "../models/WaterPointModel.js";

const router = express.Router();

// ✅ Record a new crowd report
router.post("/report", async (req, res) => {
  try {
    const { waterPointId, crowdLevel } = req.body;

    // Save the report
    const report = new QueueReport({ waterPointId, crowdLevel });
    await report.save();

    // Update the main WaterPoint's queue status
    await WaterPoint.findByIdAndUpdate(waterPointId, {
      queueStatus: crowdLevel,
      lastUpdated: new Date(),
    });

    res.status(201).json({ message: "Report logged successfully", report });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get crowd summary for a water point (past 24 hours)
router.get("/summary/:id", async (req, res) => {
  try {
    const waterPointId = req.params.id;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const summary = await QueueReport.aggregate([
      {
        $match: {
          waterPointId: new mongoose.Types.ObjectId(waterPointId),
          reportedAt: { $gte: oneDayAgo },
        },
      },
      { $group: { _id: "$crowdLevel", count: { $sum: 1 } } },
    ]);

    res.json({ waterPointId, summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;


// ✅ Get best time to fetch water based on past 7 days
router.get("/best-time/:id", async (req, res) => {
  try {
    const waterPointId = req.params.id;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Get reports from the last 7 days
    const reports = await QueueReport.find({
      waterPointId,
      reportedAt: { $gte: sevenDaysAgo },
    });

    if (reports.length === 0) {
      return res.json({ message: "Not enough data yet for predictions." });
    }

    // Group reports by hour
    const hourStats = {};
    reports.forEach((report) => {
      const hour = new Date(report.reportedAt).getHours();
      if (!hourStats[hour]) {
        hourStats[hour] = { Low: 0, Medium: 0, High: 0 };
      }
      hourStats[hour][report.crowdLevel]++;
    });

    // Score each hour: Low = +2, Medium = +1, High = 0
    const hourScores = Object.entries(hourStats).map(([hour, counts]) => {
      const score = counts.Low * 2 + counts.Medium * 1 + counts.High * 0;
      return { hour: Number(hour), score };
    });

    // Sort by score (highest = least crowded)
    hourScores.sort((a, b) => b.score - a.score);

    const bestHour = hourScores[0].hour;
    const nextHour = (bestHour + 1) % 24;

    const readable = (h) => {
      const period = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      return `${displayHour}${period}`;
    };

    res.json({
      waterPointId,
      bestTime: `${readable(bestHour)}–${readable(nextHour)}`,
      dataPoints: reports.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// ✅ Predict best time for tomorrow based on 7-day trends
router.get("/predict/:id", async (req, res) => {
  try {
    const waterPointId = req.params.id;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const reports = await QueueReport.find({
      waterPointId,
      reportedAt: { $gte: sevenDaysAgo },
    });

    if (reports.length === 0) {
      return res.json({ message: "Not enough data to make predictions." });
    }

    // Group by day and hour
    const dayHourStats = {}; // { day: { hour: { Low, Medium, High } } }

    reports.forEach((report) => {
      const date = new Date(report.reportedAt);
      const day = date.getDay(); // 0-6 (Sun-Sat)
      const hour = date.getHours();

      if (!dayHourStats[day]) dayHourStats[day] = {};
      if (!dayHourStats[day][hour]) dayHourStats[day][hour] = { Low: 0, Medium: 0, High: 0 };

      dayHourStats[day][hour][report.crowdLevel]++;
    });

    // Score all hours
    const scores = {}; // { hour: score }
    for (let day in dayHourStats) {
      for (let hour in dayHourStats[day]) {
        const { Low, Medium, High } = dayHourStats[day][hour];
        const score = Low * 2 + Medium * 1 + High * 0;
        scores[hour] = (scores[hour] || 0) + score;
      }
    }

    // Average score per hour
    const avgScores = Object.entries(scores).map(([hour, score]) => ({
      hour: Number(hour),
      avg: score / 7,
    }));

    // Sort by average score (higher = less crowd)
    avgScores.sort((a, b) => b.avg - a.avg);

    const bestHour = avgScores[0].hour;
    const nextHour = (bestHour + 1) % 24;

    const readable = (h) => {
      const period = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      return `${displayHour}${period}`;
    };

    res.json({
      waterPointId,
      prediction: `Tomorrow's best time to fetch water is likely between ${readable(bestHour)}–${readable(nextHour)}`,
      dataUsed: reports.length,
      confidence: avgScores[0].avg.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Best time to fetch water for the current day
router.get("/today/:id", async (req, res) => {
  try {
    const waterPointId = req.params.id;

    // Start of today (midnight)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get all reports from today
    const reports = await QueueReport.find({
      waterPointId,
      reportedAt: { $gte: startOfDay },
    });

    if (reports.length === 0) {
      return res.json({ message: "No reports yet for today." });
    }

    // Group reports by hour
    const hourStats = {};
    reports.forEach((report) => {
      const hour = new Date(report.reportedAt).getHours();
      if (!hourStats[hour]) {
        hourStats[hour] = { Low: 0, Medium: 0, High: 0 };
      }
      hourStats[hour][report.crowdLevel]++;
    });

    // Scoring system: Low=2, Medium=1, High=0
    const hourScores = Object.entries(hourStats).map(([hour, counts]) => {
      const score = counts.Low * 2 + counts.Medium * 1 + counts.High * 0;
      return { hour: Number(hour), score };
    });

    // Sort by score descending
    hourScores.sort((a, b) => b.score - a.score);

    const bestHour = hourScores[0].hour;
    const nextHour = (bestHour + 1) % 24;

    const readable = (h) => {
      const period = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 === 0 ? 12 : h % 12;
      return `${displayHour}${period}`;
    };

    res.json({
      waterPointId,
      bestTimeToday: `${readable(bestHour)}–${readable(nextHour)}`,
      totalReports: reports.length,
      message: "Based on today's crowd data so far",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Combined insights: today's and tomorrow's best fetch times
router.get("/insights/:id", async (req, res) => {
  try {
    const waterPointId = req.params.id;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Fetch reports for today and last 7 days
    const [todayReports, weekReports] = await Promise.all([
      QueueReport.find({ waterPointId, reportedAt: { $gte: startOfDay } }),
      QueueReport.find({ waterPointId, reportedAt: { $gte: sevenDaysAgo } }),
    ]);

    // --- 📅 TODAY'S BEST TIME ---
    let bestTimeToday = null;
    if (todayReports.length > 0) {
      const hourStats = {};
      todayReports.forEach((r) => {
        const hour = new Date(r.reportedAt).getHours();
        if (!hourStats[hour]) hourStats[hour] = { Low: 0, Medium: 0, High: 0 };
        hourStats[hour][r.crowdLevel]++;
      });

      const hourScores = Object.entries(hourStats).map(([hour, counts]) => ({
        hour: Number(hour),
        score: counts.Low * 2 + counts.Medium * 1 + counts.High * 0,
      }));

      hourScores.sort((a, b) => b.score - a.score);
      const bestHour = hourScores[0].hour;
      const nextHour = (bestHour + 1) % 24;

      const readable = (h) => {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        return `${displayHour}${period}`;
      };

      bestTimeToday = `${readable(bestHour)}–${readable(nextHour)}`;
    }

    // --- 🔮 TOMORROW'S PREDICTION ---
    let predictedBestTime = null;
    let confidence = 0;

    if (weekReports.length > 0) {
      const dayHourStats = {};
      weekReports.forEach((r) => {
        const date = new Date(r.reportedAt);
        const day = date.getDay();
        const hour = date.getHours();

        if (!dayHourStats[day]) dayHourStats[day] = {};
        if (!dayHourStats[day][hour]) dayHourStats[day][hour] = { Low: 0, Medium: 0, High: 0 };

        dayHourStats[day][hour][r.crowdLevel]++;
      });

      const scores = {};
      for (let day in dayHourStats) {
        for (let hour in dayHourStats[day]) {
          const { Low, Medium, High } = dayHourStats[day][hour];
          const score = Low * 2 + Medium * 1 + High * 0;
          scores[hour] = (scores[hour] || 0) + score;
        }
      }

      const avgScores = Object.entries(scores).map(([hour, score]) => ({
        hour: Number(hour),
        avg: score / 7,
      }));

      avgScores.sort((a, b) => b.avg - a.avg);

      const bestHour = avgScores[0].hour;
      const nextHour = (bestHour + 1) % 24;

      const readable = (h) => {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        return `${displayHour}${period}`;
      };

      predictedBestTime = `${readable(bestHour)}–${readable(nextHour)}`;
      confidence = avgScores[0].avg.toFixed(2);
    }

    res.json({
      waterPointId,
      today: bestTimeToday
        ? { bestTimeToday, reportsAnalyzed: todayReports.length }
        : { message: "No reports yet for today." },
      tomorrow: predictedBestTime
        ? {
            predictedBestTime,
            confidence,
            reportsAnalyzed: weekReports.length,
          }
        : { message: "Not enough data for tomorrow's prediction." },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
