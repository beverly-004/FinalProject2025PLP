import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WaterPointsPage() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

   const API = "https://aquaproject.onrender.com";

useEffect(() => { axios.get("${API}/api/dashboard`") .
  then(res => { setPoints(res.data);
     setLoading(false); }) 
     .catch(err => 
      console.error("Error loading water points:", err)); }, []);


  if (loading) {
    return <p className="p-6">Loading water points...</p>;
  }

  return (

   

   
    <div
  
    className="p-8 min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/aesthetic.jpg')" }}>
       


       <div className="card-bg p-6 rounded-xl shadow-lg">
        
       </div>



    
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Community Water Points
      </h1>
      <Link
        to="/add"
        className="bg-green-600 text-white px-4 py-2 rounded shadow mb-6 inline-block"
      >
        + Add Water Point
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((wp) => (
          <div
            key={wp._id}
            className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl border border-blue-100 transition">


            <h2 className="text-xl font-semibold">{wp.name}</h2>
            <p className="text-gray-600">{wp.location}</p>

            {/* Safety Badge */}
            <div className="mt-2">
              {wp.isSafe ? (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                  Safe
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                  Unsafe
                </span>
              )}
            </div>

            {/* Queue Badge */}
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                Queue: {wp.queueStatus}
              </span>
            </div>

            {/* Info */}
            <p className="mt-3 text-sm">
              <strong>Best time today:</strong> {wp.bestTimeToday}
            </p>
            <p className="text-sm">
              <strong>Predicted tomorrow:</strong> {wp.predictedBestTime}
            </p>
            <p className="text-sm">
              <strong>Issues:</strong> {wp.issueCount ?? 0}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={`/issues/${wp._id}`}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                View Issues
              </Link>

              <Link
                to="/map"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                View on Map
              </Link>

              <button
                onClick={async () => {
                  const msg = prompt("Describe the issue:");
                  if (!msg) return;
                   await axios.post(`${API}/api/issues/report/${wp._id}`, { message: msg });
                  alert("Issue reported!");
                }}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Report Issue
              </button>

              {/* Mark Safe Button */}
              {(!wp.isSafe || wp.issueCount > 0) && (
                <button
                  onClick={async () => {
                    await axios.post(`${API}/api/admin/clear/${wp._id}`);
                    const res = await axios.get("${API}/api/dashboard");
                    setPoints(res.data);
                    alert("Marked as safe!");
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Mark Safe
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
