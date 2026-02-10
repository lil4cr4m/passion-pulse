import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Trophy, Medal, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      // Hits the endpoint created in userRoutes
      const res = await api.get("/users/leaderboard");
      setLeaders(res.data);
    };
    fetchLeaders();
  }, []);

  const getIcon = (index) => {
    if (index === 0) return <Trophy className="text-amber-500" />;
    if (index === 1) return <Medal className="text-slate-400" />;
    if (index === 2) return <Medal className="text-amber-700" />;
    return <Star className="text-indigo-200" size={16} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 bg-indigo-600">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <Trophy size={20} /> Community Leaders
        </h2>
        <p className="text-indigo-100 text-sm">Top Karma earners this week</p>
      </div>
      <div className="divide-y divide-slate-100">
        {leaders.map((leader, index) => (
          <Link
            key={leader.id}
            to={`/profile/${leader.id}`}
            className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="w-6 text-center font-bold text-slate-400">
                {index + 1}
              </span>
              <div className="flex items-center gap-3">
                {getIcon(index)}
                <span className="font-semibold text-slate-800">
                  {leader.username}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-indigo-600 font-bold">{leader.karma}</span>
              <span className="text-xs text-slate-400 uppercase">Karma</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
