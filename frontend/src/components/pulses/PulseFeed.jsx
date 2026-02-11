import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import PulseCard from "./PulseCard";

const PulseFeed = ({ selectedCategory }) => {
  const [pulses, setPulses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPulses = async () => {
      setLoading(true);
      try {
        const res = await api.get("/pulses", {
          params: selectedCategory ? { category: selectedCategory } : {},
        });
        setPulses(res.data);
      } catch (err) {
        console.error("[PulseFeed] Failed to load pulses", {
          message: err?.message,
          status: err?.response?.status,
          data: err?.response?.data,
        });
        setPulses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPulses();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-slate-500">
        Loading live pulses...
      </div>
    );
  }

  if (!pulses.length) {
    return (
      <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-500">
        No live pulses right now. Be the first to go live!
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {pulses.map((pulse) => (
        <PulseCard key={pulse.id} pulse={pulse} />
      ))}
    </div>
  );
};

export default PulseFeed;
