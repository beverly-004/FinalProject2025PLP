import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import MapViewSkeleton from "./skeletons/MapViewSkeleton";

// Marker icons
const safeIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const unsafeIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Smooth fly animation
function FlyToLocation({ point }) {
  const map = useMap();
  useEffect(() => {
    if (point?.coordinates?.lat && point?.coordinates?.lng) {
      map.flyTo([point.coordinates.lat, point.coordinates.lng], 16, {
        duration: 1.5,
      });
    }
  }, [point, map]);
  return null;
}

export default function MapView() {
  const [waterPoints, setWaterPoints] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [loading, setLoading] = useState(true);

  // DEPLOYED BACKEND URL
  const API = "https://aquaproject.onrender.com";

  // Fetch data
  useEffect(() => {
    axios
      .get(`${API}/api/dashboard`)
      .then((res) => {
        setWaterPoints(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching map data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <MapViewSkeleton />;

  // Report Issue
  const reportIssue = async (id) => {
    const message = prompt("Describe the issue:");
    if (!message) return;

    await axios.post(`${API}/api/issues/report/${id}`, { message });

    alert("Issue reported successfully!");
  };

  // Update queue
  const updateQueue = async (id, newStatus) => {
    try {
      await axios.post(`${API}/api/queue/update/${id}`, {
        status: newStatus,
      });

      const res = await axios.get(`${API}/api/dashboard`);
      setWaterPoints(res.data);

      alert(`Queue updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update queue.");
    }
  };

  return (
    <div className="mt-6 p-16">
      {/* Glass header */}
      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-blue-200 mb-8">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
          AquaLink Map View
        </h2>

        <button
          onClick={() => (window.location.href = "/waterpoints")}
          className="bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to Water Points
        </button>

        {/* Search Box */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search water point..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-300 outline-none dark:bg-gray-800 dark:text-white"
          />

          {search.trim() !== "" && (
            <div className="absolute left-0 right-0 bg-white dark:bg-gray-800 border shadow-lg rounded mt-1 z-[5000] max-h-48 overflow-auto">
              {waterPoints
                .filter(
                  (wp) =>
                    wp.name.toLowerCase().includes(search.toLowerCase()) ||
                    wp.location.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 5)
                .map((wp) => (
                  <div
                    key={wp._id}
                    onClick={() => {
                      setSelectedPoint(wp);
                      setSearch("");
                    }}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {wp.name} — {wp.location}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* MAP */}
      <MapContainer
        center={[-1.286389, 36.817223]}
        zoom={12}
        className="rounded-2xl shadow-2xl overflow-hidden border border-gray-300 dark:border-gray-700"
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {selectedPoint && <FlyToLocation point={selectedPoint} />}

        {waterPoints.map((wp) =>
          wp.coordinates?.lat && wp.coordinates?.lng ? (
            <Marker
              key={wp._id}
              position={[wp.coordinates.lat, wp.coordinates.lng]}
              icon={wp.isSafe ? safeIcon : unsafeIcon}
            >
              <Popup>
                <strong>{wp.name}</strong>
                <br />
                Location: {wp.location}
                <br />
                Queue: {wp.queueStatus}
                <br />
                Safety: {wp.isSafe ? "Safe" : "Unsafe"}
                <br />
                Best time today: {wp.bestTimeToday}
                <br />
                Predicted tomorrow: {wp.predictedBestTime}
                <br />
                <br />

                <button
                  onClick={() => reportIssue(wp._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded mb-2"
                >
                  Report Issue
                </button>

                <strong>Update Queue:</strong>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => updateQueue(wp._id, "Low")}
                    className="px-2 py-1 text-xs bg-green-200 text-green-700 rounded"
                  >
                    Low
                  </button>
                  <button
                    onClick={() => updateQueue(wp._id, "Medium")}
                    className="px-2 py-1 text-xs bg-yellow-200 text-yellow-700 rounded"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => updateQueue(wp._id, "High")}
                    className="px-2 py-1 text-xs bg-red-200 text-red-700 rounded"
                  >
                    High
                  </button>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
