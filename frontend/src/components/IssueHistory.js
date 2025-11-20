import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

export default function IssueHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/api/history/${id}`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.error("Error loading issue history:", err));
  }, [id]);

  if (!history) return <p className="p-4">Loading...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{ backgroundImage: "url('/images/aesthetic.jpg')" }}
    >
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-100">
        <h2 className="text-2xl font-bold mb-4">Issue History: {history.name}</h2>

        <Link to="/waterpoints" className="bg-blue-600 text-white px-4 py-2 rounded shadow mb-4 inline-block">
          Back
        </Link>

        {history.issues.length === 0 ? (
          <p>No issues reported.</p>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            {history.issues.map((issue, index) => (
              <div key={index} className="border-b py-2">
                <p>
                  <strong>Message:</strong> {issue.message}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(issue.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
