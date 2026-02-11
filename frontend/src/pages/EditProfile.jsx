import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { Save, ChevronLeft, User, FileText } from "lucide-react";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  // Load existing data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Hits your backend update route
      const res = await api.put(`/users/profile/${user.id}`, formData);

      // Update global context so the Navbar and Profile reflect changes immediately
      setUser({ ...user, ...res.data });

      navigate(`/profile/${user.id}`);
    } catch (err) {
      console.error("UPDATE_FAILED", err);
      alert("Failed to update profile signal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-black uppercase text-xs mb-6 hover:text-violet transition-colors"
      >
        <ChevronLeft size={16} /> Back to Node
      </button>

      <div className="bg-white border-3 border-ink p-8 rounded-[2.5rem] shadow-brutal-lg">
        <header className="mb-8">
          <h1 className="text-4xl font-black italic uppercase italic">
            Modify_Identity
          </h1>
          <p className="text-ink/50 font-bold text-xs uppercase tracking-widest">
            Update your public pulse metadata
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME INPUT */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-black uppercase text-xs italic">
              <User size={14} /> Display Name
            </label>
            <input
              type="text"
              className="input-brutal"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* BIO TEXTAREA */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-black uppercase text-xs italic">
              <FileText size={14} /> Neural Bio
            </label>
            <textarea
              className="input-brutal h-32 resize-none"
              placeholder="Broadcast your vibe..."
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            variant="cyan"
            className="w-full py-4 text-lg shadow-brutal hover:shadow-brutal-lg"
            disabled={loading}
          >
            <Save size={20} className="mr-2" />
            {loading ? "SYNCING..." : "SAVE_CHANGES"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
