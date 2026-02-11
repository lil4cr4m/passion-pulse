import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Trophy, PlusCircle, Search, Activity } from "lucide-react";

// Project Imports - Standardized Paths
import { useAuth } from "../context/AuthContext";
import PulseFeed from "../components/pulses/PulseFeed";
import Leaderboard from "../components/Leaderboard";
import { Button } from "../components/ui/Button";

const Home = () => {
  // Access dynamic user data from the DB via AuthContext
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    /* Main Layout Container: Standardized Grid spacing */
    <div className="max-w-[1400px] mx-auto p-4 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* COLUMN 1: LHS (Sticky Identity Card) - Span 3 */}
      <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6">
        {/* User Greeting: Linked to DB */}
        <div className="bg-cyan border-3 border-ink p-8 rounded-3xl shadow-brutal">
          <h1 className="text-4xl leading-none">
            Hey,
            <br />
            <span className="bg-white px-1 italic">
              {user?.username || "Viber"}
            </span>
          </h1>
          <p className="mt-4 font-black text-xs uppercase opacity-60 tracking-widest">
            Status: Synchronized
          </p>
        </div>

        {/* Create Pulse Quick Action */}
        <div className="bg-pink border-3 border-ink p-8 rounded-3xl shadow-brutal text-white">
          <h2 className="text-xl mb-4 italic flex items-center gap-2">
            <Activity size={20} /> Share Signal
          </h2>
          <Link to="/create">
            <Button variant="outline" className="w-full text-ink border-ink">
              <PlusCircle size={18} /> New Pulse
            </Button>
          </Link>
        </div>

        {/* Karma Stats: Linked to DB user object */}
        <div className="bg-yellow border-3 border-ink p-8 rounded-3xl shadow-brutal">
          <p className="text-xs font-black uppercase italic">Current Karma</p>
          <p className="text-5xl font-black tabular-nums">
            {user?.karma_score || 0}
          </p>
        </div>
      </aside>

      {/* COLUMN 2: MIDDLE (The Feed) - Span 6 */}
      <main className="lg:col-span-6 space-y-8">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="SEARCH_FOR_SIGNALS..."
              className="input-brutal w-full pr-12"
            />
            <Search className="absolute right-4 top-4 opacity-40" />
          </div>
        </div>

        {/* Dynamic Feed: Linked to DB through the PulseFeed component */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl italic underline decoration-violet decoration-8 underline-offset-4">
              Live Signals
            </h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-green animate-pulse border-2 border-ink" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Real-time Feed
              </span>
            </div>
          </div>

          <PulseFeed selectedCategory={activeCategory} />
        </section>
      </main>

      {/* COLUMN 3: RHS (Leaderboard) - Span 3 */}
      <aside className="lg:col-span-3 lg:sticky lg:top-28">
        <div className="bg-white border-3 border-ink rounded-3xl shadow-brutal-lg overflow-hidden">
          {/* Clean Header with your Theme Colors */}
          <div className="p-6 border-b-3 border-ink bg-violet text-white flex items-center gap-3">
            <Trophy size={24} className="fill-yellow text-ink" />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              Top_Nodes
            </h2>
          </div>

          {/* The Leaderboard component now fits perfectly inside */}
          <div className="bg-white">
            <Leaderboard />
          </div>

          {/* Footer Detail */}
          <div className="p-4 bg-ink text-white text-[9px] font-black uppercase tracking-[0.3em] text-center">
            Global_Sync_Active
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;
