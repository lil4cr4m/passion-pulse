import React, { useState } from "react";
import PulseFeed from "../components/pulses/PulseFeed";
import Leaderboard from "../components/Leaderboard";
import { useAuth } from "../context/AuthContext";
import { Flame } from "lucide-react";

const Home = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
          <Flame className="text-orange-500" fill="currentColor" />
          Live Now
        </h1>
        <p className="text-slate-500 mt-2">
          Discover what the community is building, cooking, and learning right
          now.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Section (Occupies 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <PulseFeed selectedCategory={activeCategory} />
        </div>

        {/* Sidebar Section (Occupies 1 column) */}
        <div className="space-y-8">
          {user && (
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900">
                Welcome back, {user.username}!
              </h3>
              <p className="text-sm text-indigo-700 mt-1">
                Ready to share a new vibe today?
              </p>
            </div>
          )}

          {/* Reusing the Leaderboard component here */}
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
