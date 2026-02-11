import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Trophy, Medal, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await api.get("/users/leaderboard");
        setLeaders(res.data);
      } catch (err) {
        console.error("[Leaderboard] Failed to load leaderboard", err);
        setLeaders([]);
      }
    };
    fetchLeaders();
  }, []);

  const getIcon = (index) => {
    if (index === 0) return <Trophy className="text-yellow" size={20} />;
    if (index === 1) return <Medal className="text-slate-400" size={20} />;
    if (index === 2) return <Medal className="text-amber-700" size={20} />;
    return <Star className="text-violet/30" size={16} />;
  };

  return (
    <div className="divide-y-3 divide-ink/10">
      {leaders.map((leader, index) => (
        <Link
          key={leader.id}
          to={`/profile/${leader.id}`}
          className="group flex items-center justify-between p-4 hover:bg-violet/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
        >
          <div className="flex items-center gap-4">
            {/* Rank Number */}
            <span className="w-6 text-center font-black italic text-ink/30 italic group-hover:text-violet">
              {index + 1}
            </span>

            <div className="flex items-center gap-3">
              <div className="bg-white border-2 border-ink p-1.5 rounded-lg shadow-brutal-sm group-hover:-rotate-6 transition-transform">
                {getIcon(index)}
              </div>
              <div className="flex flex-col">
                <span className="font-black uppercase text-sm tracking-tighter">
                  {leader.username}
                </span>
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">
                  Level_{Math.floor(leader.karma / 100) + 1}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block font-black text-lg leading-none">
                {leader.karma}
              </span>
              <span className="text-[8px] font-black uppercase tracking-tighter opacity-50">
                Karma
              </span>
            </div>
            <ChevronRight
              size={16}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
            />
          </div>
        </Link>
      ))}

      {leaders.length === 0 && (
        <div className="p-8 text-center font-black uppercase text-xs opacity-40">
          Syncing_Leader_Nodes...
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
