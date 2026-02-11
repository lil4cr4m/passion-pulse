import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Award, PlusSquare } from "lucide-react";

// Project Imports
import { useAuth } from "../context/AuthContext";
import PulseFeed from "../components/pulses/PulseFeed";
import Leaderboard from "../components/Leaderboard";
import Button from "../components/ui/Button";

const Home = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 flex items-center gap-3">
          <Flame className="text-orange-500" fill="currentColor" />
          Live Now
        </h1>
        <p className="text-slate-500 mt-2">
          Discover what the community is sharing right now.
        </p>
      </header>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed (Left Side) */}
        <div className="lg:col-span-2 space-y-6">
          <PulseFeed selectedCategory={activeCategory} />
        </div>

        {/* Sidebar (Right Side) */}
        <div className="space-y-8">
          {user ? (
            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
              <h3 className="font-bold text-xl">Hi, {user.username}!</h3>
              <div className="flex items-center gap-2 mt-2 opacity-90">
                <Award size={18} className="text-amber-400" />
                <span className="text-sm">{user.karma} Karma</span>
              </div>
              <Link to="/create" className="block mt-6">
                <Button
                  variant="secondary"
                  className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
                >
                  <PlusSquare size={18} />
                  Go Live
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-slate-100 p-6 rounded-2xl border-2 border-dashed border-slate-300 text-center">
              <p className="text-slate-600 font-medium">Join to earn Karma!</p>
              <Link to="/login" className="block mt-4">
                <Button className="w-full">Login</Button>
              </Link>
            </div>
          )}

          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
