import React, { useState } from "react";
import api from "../api/axios";
import { Heart, Send } from "lucide-react";

const GratitudeForm = ({ pulseId, onNoteSent }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Posts data to the notesController
      const res = await api.post("/notes", {
        pulse_id: pulseId,
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
    <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100">
      <h4 className="text-rose-700 font-bold flex items-center gap-2 mb-2">
        <Heart size={18} fill="currentColor" /> Send a Thank You
      </h4>
      <p className="text-xs text-rose-600 mb-4">
        Leaving a note awards the host +10 Karma!
      </p>

      {message ? (
        <div className="p-3 bg-white border border-rose-200 text-rose-700 rounded text-sm font-medium">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            required
            className="w-full p-3 text-sm border-none rounded-lg focus:ring-2 focus:ring-rose-300"
            placeholder="What did you learn from this session?"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            <Send size={16} /> {isSubmitting ? "Sending..." : "Send Gratitude"}
          </button>
        </form>
      )}
    </div>
  );
};

export default GratitudeForm;
