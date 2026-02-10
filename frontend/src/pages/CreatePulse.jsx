import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreatePulse = () => {
  const [interests, setInterests] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    interest_id: "",
    meeting_link: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the vibe catalog from your interestController
    const fetchInterests = async () => {
      const res = await api.get("/interests");
      setInterests(res.data);
    };
    fetchInterests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Posts to pulseController.js
      await api.post("/pulses", formData);
      navigate("/"); // Back to feed
    } catch (err) {
      alert("Failed to broadcast. Ensure all fields are filled.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Broadcast a New Pulse</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg border"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Vibe Category
          </label>
          <select
            required
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, interest_id: e.target.value })
            }
          >
            <option value="">Select a vibe...</option>
            {interests.map((i) => (
              <option key={i.id} value={i.id}>
                {i.vibe_category}: {i.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            placeholder="e.g., Live Coding: React Optimization"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Meeting Link (Zoom/Jitsi)
          </label>
          <input
            type="url"
            required
            className="w-full p-2 border rounded"
            placeholder="https://..."
            onChange={(e) =>
              setFormData({ ...formData, meeting_link: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded font-bold"
        >
          Start Broadcasting
        </button>
      </form>
    </div>
  );
};

export default CreatePulse;
