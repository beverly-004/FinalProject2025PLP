import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddWaterPoint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    lat: "",
    lng: "",
    queueStatus: "Low",
    isSafe: true,
  });

   const API = "https://aquaproject.onrender.com";
   

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://aquaproject.onrender.com/api/waterpoints/add", {

        name: form.name,
        location: form.location,
        lat: Number(form.lat),
        lng: Number(form.lng),
        queueStatus: form.queueStatus,
        isSafe: form.isSafe === "true",
      });

      alert("Water point added!");
      navigate("/");
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to add water point");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
  style={{ backgroundImage: "url('/images/aesthetic.jpg')" }}
>

<div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border border-blue-100">




      <h2 className="text-2xl font-bold text-blue-700 mb-4">Add New Water Point</h2>

      <form onSubmit={submit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Water point name"
          value={form.name}
          onChange={update}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location (e.g. Kibera)"
          value={form.location}
          onChange={update}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex gap-3">
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            value={form.lat}
            onChange={update}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />

          <input
            type="number"
            name="lng"
            placeholder="Longitude"
            value={form.lng}
            onChange={update}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>

        <select
          name="queueStatus"
          value={form.queueStatus}
          onChange={update}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Low">Low Queue</option>
          <option value="Medium">Medium Queue</option>
          <option value="High">High Queue</option>
        </select>

        <select
          name="isSafe"
          value={form.isSafe}
          onChange={update}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="true">Safe</option>
          <option value="false">Unsafe</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-800"
        >
          Add Water Point
        </button>
      </form>
    </div>
    </div>
  );
}
