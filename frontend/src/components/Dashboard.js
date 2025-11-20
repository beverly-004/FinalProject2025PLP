import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

   const API = "https://aquaproject.onrender.com";

  // Filters
  const [safetyFilter, setSafetyFilter] = useState("all"); // all | safe | unsafe | unknown
  const [queueFilter, setQueueFilter] = useState("all"); // all | Low | Medium | High | Unknown
  const [unsafeOnly, setUnsafeOnly] = useState(false);

  useEffect(() => {
    axios.get("${API}/api/dashboard")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-blue-600 text-xl font-semibold animate-pulse">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  // Helper: queue badge classes
  const queueBadge = (q) => {
    switch ((q || "").toLowerCase()) {
      case "low":
        return { label: "Low", classes: "bg-green-100 text-green-700" };
      case "medium":
        return { label: "Medium", classes: "bg-yellow-100 text-yellow-800" };
      case "high":
        return { label: "High", classes: "bg-red-100 text-red-700" };
      default:
        return { label: "Unknown", classes: "bg-gray-100 text-gray-700" };
    }
  };

  // Filter data based on selected filters
  const filtered = data.filter((wp) => {
    if (unsafeOnly && wp.isSafe) return false;

    if (safetyFilter !== "all") {
      if (safetyFilter === "safe" && !wp.isSafe) return false;
      if (safetyFilter === "unsafe" && wp.isSafe) return false;
      if (safetyFilter === "unknown" && wp.isSafe !== undefined && wp.isSafe !== null) return false;
    }

    if (queueFilter !== "all") {
      if ((wp.queueStatus || "Unknown").toLowerCase() !== queueFilter.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  const updateQueue = async (id, newStatus) => {
  try {
    await axios.post(`${API}/api/queue/update/${id}`, {
      status: newStatus,
    });

    // Refresh dashboard data
    const res = await axios.get("${API}/api/dashboard");
    setData(res.data);

    alert(`Queue updated to ${newStatus}`);
  } catch (err) {
    console.error("Queue update error:", err);
    alert("Failed to update queue.");
  }
};


const clearIssues = async (id) => {
  if (!window.confirm("Mark this water point as safe and clear all issues?"))
    return;

  try {
    await axios.post(``);

    // Refresh dashboard
    const res = await axios.get("${API}/api/admin/clear/${id}");
    setData(res.data);

    alert("Water point marked as safe!");
  } catch (error) {
    console.error("Clear issues error:", error);
    alert("Failed to clear issues.");
  }
};





  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">💧 AquaLink Dashboard</h1>
      <p className="text-gray-600 mb-6">Live overview of all community water points</p>

      {/* Filters row */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label className="text-sm text-gray-700 mr-2">Safety</label>
          <select
            value={safetyFilter}
            onChange={(e) => setSafetyFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="safe">Safe</option>
            <option value="unsafe">Unsafe</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700 mr-2">Queue</label>
          <select
            value={queueFilter}
            onChange={(e) => setQueueFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <button
          onClick={() => { setUnsafeOnly(!unsafeOnly); setSafetyFilter("all"); }}
          className={`px-3 py-1 rounded ${unsafeOnly ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          {unsafeOnly ? "Showing: Unsafe only" : "Show Unsafe only"}
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Queue</th>
              <th className="p-3 text-left">Safety</th>
              <th className="p-3 text-left">Issues</th>
              <th className="p-3 text-left">Best Time Today</th>
              <th className="p-3 text-left">Predicted Tomorrow</th>
              <th className="p-3 text-left">History</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((wp) => {
              const q = queueBadge(wp.queueStatus);
              return (
                <tr key={wp._id} className="border-b">
                  <td className="p-4">{wp.name}</td>
                  <td className="p-4">{wp.location}</td>

                  {/* Queue badge */}
<td className="p-4">
 
<span className={`px-2 py-1 rounded-full text-xs font-semibold ${q.classes}`}>
    {q.label}
  </span>
  {/* Buttons to update queue */}

  <div className="flex gap-1 mt-2">

    <button
      onClick={() => updateQueue(wp._id, "Low")}
      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
    >
      Low
    </button>

    <button
      onClick={() => updateQueue(wp._id, "Medium")}
      className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded"
    >
      Medium
    </button>

    <button
      onClick={() => updateQueue(wp._id, "High")}
      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
    >
      High
    </button>

  </div>
  </td>

                  {/* Safety badge */}
                  <td className="p-4">
                    {wp.isSafe === true ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        🟢 Safe
                      </span>
                    ) : wp.isSafe === false ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        🔴 Unsafe
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        ⚪ Unknown
                      </span>
                    )}
                  </td>

                  <td className="p-4">{wp.issueCount ?? 0}</td>
                  <td className="p-4">{wp.bestTimeToday}</td>
                  <td className="p-4">{wp.predictedBestTime}</td>

            <td className="p-4 flex flex-col gap-2">

  <Link
    to={`/issues/${wp._id}`}
    className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-900"
  >
    View
  </Link>

  {wp.issueCount > 0 || wp.isSafe === false ? (
    <button
      onClick={() => clearIssues(wp._id)}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Mark Safe
    </button>
  ) : null}

</td>

                            
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend + queue legend box with border */}
      <div className="mt-4 p-4 bg-white rounded border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold mb-2">Legend</h3>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            <span>Safe Water Point</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
            <span>Unsafe Water Point</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-500"></span>
            <span>Unknown</span>
          </div>

          <div className="col-span-2 mt-2">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-300"></span>
                <span>Queue - Low</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-300"></span>
                <span>Queue - Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-red-300"></span>
                <span>Queue - High</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
                <span>Queue - Unknown</span>
              </div>
            </div>
          </div>
        </div>
      </div>




<Link
  to="/add"
  className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
>
  + Add Water Point
</Link>




      {/* View Map button */}
      <div className="mt-6">
        <Link
          to="/map"
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          View Map
        </Link>
      </div>
    </div>
  );
}
