import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Your DB-linked axios instance
import { Button } from "../components/ui/Button";
import { Zap, Link as LinkIcon, Info, Layers } from "lucide-react";

const CreatePulse = () => {
  // DB States
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    interest_id: "",
    meeting_link: "",
  });

  const navigate = useNavigate();

  // 1. DATA SYNC: Fetch the vibe catalog from interestController
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await api.get("/interests");
        setInterests(res.data);
      } catch (err) {
        setInterests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, []);

  // 2. BROADCAST LOGIC: Posts to pulseController.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pulses", formData);
      navigate("/"); // Redirect back to feed on success
    } catch (err) {
      alert("BROADCAST_FAILURE: Ensure all fields are valid.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-12">
      {/* Container with Brutalist Shadow and Pink Accent */}
      <div className="bg-white border-3 border-ink p-8 md:p-12 rounded-[2.5rem] shadow-brutal-lg">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-5xl mb-2 italic">
            Init <span className="text-pink">Signal</span>
          </h1>
          <p className="font-black text-ink/50 uppercase text-xs tracking-widest">
            Establish a New Pulse on the Network
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CATEGORY SELECT: Linked to DB Interests */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-black uppercase text-xs italic">
              <Layers size={14} /> Vibe Category
            </label>
            <select
              required
              className="input-brutal appearance-none cursor-pointer"
              value={formData.interest_id}
              onChange={(e) =>
                setFormData({ ...formData, interest_id: e.target.value })
              }
            >
              <option value="">SELECT_VIBE_TYPE...</option>
              {interests.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.vibe_category?.toUpperCase()}: {i.name}
                </option>
              ))}
            </select>
          </div>

          {/* TITLE INPUT */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-black uppercase text-xs italic">
              <Zap size={14} /> Pulse Title
            </label>
            <input
              type="text"
              required
              className="input-brutal"
              placeholder="e.g., MASTERING_REACT_RECURSION"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* MEETING LINK: Essential for the 'Join' logic */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-black uppercase text-xs italic">
              <LinkIcon size={14} /> Meeting Link (Zoom/Jitsi/Meet)
            </label>
            <input
              type="url"
              required
              className="input-brutal"
              placeholder="https://meet.google.com/..."
              onChange={(e) =>
                setFormData({ ...formData, meeting_link: e.target.value })
              }
            />
          </div>

          {/* DESCRIPTION TEXTAREA */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-black uppercase text-xs italic">
              <Info size={14} /> Signal Data (Description)
            </label>
            <textarea
              className="input-brutal h-32 resize-none"
              placeholder="Tell the network what we're pulsing about..."
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* SUBMIT BUTTON: Cyber Yellow for High Visibility */}
          <div className="pt-6">
            <Button
              type="submit"
              variant="violet"
              className="w-full py-5 text-xl shadow-brutal hover:shadow-brutal-lg"
              disabled={loading}
            >
              {loading ? "SYNCING..." : "LAUNCH BROADCAST"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePulse;
