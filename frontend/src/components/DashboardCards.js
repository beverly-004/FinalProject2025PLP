import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/dashboard`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const reportIssue = async (id) => {
    const message = prompt("Describe the issue:");
    if (!message) return;
    try {
      await axios.post(`${API}/api/issues/report/${id}`, { message });
      alert("Issue reported. Thanks!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to report issue.");
    }
  };

  const updateQueue = async (id, status) => {
    try {
      await axios.post(`${API}/api/queue/update/${id}`, { status });
      await fetchData();
    } catch (err) {
      console.error("Queue update error:", err);
      alert("Failed to update queue status.");
    }
  };

  const clearIssues = async (id) => {
    if (!window.confirm("Mark this water point as safe and clear issues?")) return;
    try {
      await axios.post(`${API}/api/admin/clear/${id}`);
      await fetchData();
      alert("Water point marked safe and issues cleared.");
    } catch (err) {
      console.error("Clear issues error:", err);
      alert("Failed to clear issues.");
    }
  };

  const queueBadge = (q) => {
    const s = (q || "").toLowerCase();
    if (s === "low") return { label: "Low", classes: "bg-green-100 text-green-800" };
    if (s === "medium") return { label: "Medium", classes: "bg-yellow-100 text-yellow-900" };
    if (s === "high") return { label: "High", classes: "bg-red-100 text-red-800" };
    return { label: "Unknown", classes: "bg-gray-100 text-gray-700" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-blue-600 text-lg font-semibold animate-pulse">Loading water points…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">AquaLink Dashboard</h1>
            <p className="text-sm text-slate-500">A card-based view of all community water points</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/map" className="inline-block bg-white border px-4 py-2 rounded shadow hover:bg-gray-50">
              View Map
            </Link>

            <Link to="/add" className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
              + Add Water Point
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((wp) => {
            const q = queueBadge(wp.queueStatus);
            const isUnsafe = wp.isSafe === false;
            const headerGradient = isUnsafe ? "from-red-400 to-red-600" : "from-blue-500 to-teal-400";

            return (
              <div key={wp._id} className="rounded-2xl shadow-md overflow-hidden bg-white">
                <div className={`p-4 bg-gradient-to-r ${headerGradient} text-white`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{wp.name}</h3>
                      <p className="text-sm opacity-90">{wp.location}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs opacity-90">Status</div>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20">
                          {wp.status || "Open"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${isUnsafe ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {isUnsafe ? "Unsafe" : "Safe"}
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${q.classes}`}>
                        {q.label}
                      </div>
                    </div>

                    <div className="text-sm text-slate-500">
                      Updated: {wp.lastUpdated ? new Date(wp.lastUpdated).toLocaleString() : "—"}
                    </div>
                  </div>

                  <div className="text-sm text-slate-700 mb-4">
                    <div><strong>Best time today:</strong> {wp.bestTimeToday || "Not available"}</div>
                    <div><strong>Predicted tomorrow:</strong> {wp.predictedBestTime || "Not available"}</div>
                    <div className="mt-2"><strong>Issues:</strong> {wp.issueCount ?? (wp.reportedIssues?.length ?? 0)}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button onClick={() => navigate(`/issues/${wp._id}`)} className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50">
                      View Issues
                    </button>

                    <button onClick={() => navigate("/map")} className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50">
                      View on Map
                    </button>

                    <button onClick={() => reportIssue(wp._id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                      Report Issue
                    </button>

                    <div className="ml-auto flex items-center gap-1">
                      <button onClick={() => updateQueue(wp._id, "Low")} className="text-xs px-2 py-1 rounded bg-green-50 text-green-700">L</button>
                      <button onClick={() => updateQueue(wp._id, "Medium")} className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700">M</button>
                      <button onClick={() => updateQueue(wp._id, "High")} className="text-xs px-2 py-1 rounded bg-red-50 text-red-700">H</button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {(wp.issueCount > 0 || wp.isSafe === false) && (
                      <button
                        onClick={() => clearIssues(wp._id)}
                        className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Mark Safe
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
   {/* Empty-state if no water points */}
        {data.length === 0 && (
          <div className="mt-12 text-center text-gray-600">
            No water points found. Add one using the <strong>+ Add Water Point</strong> button.
          </div>
        )}
      </div>
    </div>
  );
}
