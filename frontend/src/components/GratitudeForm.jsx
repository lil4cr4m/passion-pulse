import React, { useState } from "react";
import api from "../api/axios";
import { Heart, Send } from "lucide-react";

const GratitudeForm = ({ castId, onNoteSent }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Posts data to the notesController
      const res = await api.post("/notes", {
        cast_id: castId,
        content: content,
      });

      // The backend returns a confirmation message
      setMessage(res.data.message);
      setContent("");
      if (onNoteSent) onNoteSent();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send gratitude.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-pink/15 rounded-xl border-3 border-ink shadow-brutal-sm">
      <h4 className="text-ink font-black flex items-center gap-2 mb-2">
        <Heart size={18} className="text-pink" fill="#FF32F1" /> SEND_GRATITUDE
      </h4>
      <p className="text-xs text-ink/70 mb-4 font-bold uppercase tracking-wide">
        Leaving a note awards the host +10 Credit!
      </p>

      {message ? (
        <div className="p-3 bg-white border-3 border-ink text-ink rounded-lg text-sm font-black">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            required
            className="w-full p-3 text-sm border-3 border-ink rounded-lg focus:ring-2 focus:ring-pink/40"
            placeholder="What did you learn from this session?"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full bg-pink text-white border-3 border-ink hover:bg-[#e632e6] py-2 rounded-lg font-black uppercase tracking-tight transition-colors disabled:opacity-50"
          >
            <Send size={16} /> {isSubmitting ? "Sending..." : "Send Gratitude"}
          </button>
        </form>
      )}
    </div>
  );
};

export default GratitudeForm;
