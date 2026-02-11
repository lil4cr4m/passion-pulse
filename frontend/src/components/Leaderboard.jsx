import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await api.get("/users/leaderboard");
        setLeaders(res.data);
      } catch (err) {
        setLeaders([]);
      }
    };
    fetchLeaders();
  }, []);

  return (
    <div className="divide-y-[0.1875rem] divide-ink/10">
      {leaders.map((leader, index) => (
        <Link
          key={leader.id}
          to={`/profile/${leader.id}`}
          className="group grid grid-cols-[1.75rem_1fr_auto] items-center gap-[0.6rem] p-[1rem] hover:bg-yellow/10 transition-all min-w-0"
        >
          <span className="font-black italic text-ink/20 text-[1rem] xl:text-[1.125rem] leading-none text-center">
            {index + 1}
          </span>

          <div className="flex flex-col min-w-0">
            <span className="font-black uppercase text-[0.95rem] xl:text-[1rem] leading-none tracking-tighter truncate">
              {leader.username}
            </span>
            <span className="text-[0.6rem] xl:text-[0.625rem] font-black uppercase tracking-widest text-ink/40 mt-[0.25rem] leading-tight">
              Level_{Math.floor(leader.karma / 100) + 1}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Leaderboard;
