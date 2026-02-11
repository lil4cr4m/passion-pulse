import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { User, Award, Activity, Heart, Globe, Edit3 } from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);

  // Check if this is the logged-in user's own profile
  const isOwnProfile = currentUser?.id?.toString() === id?.toString();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/profile/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("FAILED_TO_SYNC_PROFILE", err);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="font-black italic text-2xl animate-pulse text-violet uppercase tracking-tighter">
          Decrypting_User_Data...
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-8">
      <div className="bg-white border-3 border-ink p-8 md:p-12 rounded-[2.5rem] shadow-brutal-lg flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 -mr-16 -mt-16 rounded-full border-3 border-ink" />

        <div className="h-32 w-32 md:h-40 md:w-40 bg-yellow border-3 border-ink rounded-full flex items-center justify-center shadow-brutal shrink-0 overflow-hidden">
          <User size={64} className="text-ink" />
        </div>

        <div className="text-center md:text-left flex-1 space-y-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none">
                {profile.name || profile.username}
              </h1>
              <span className="bg-green border-3 border-ink px-3 py-1 rounded-lg text-xs font-black uppercase italic">
                {profile.role || "Member"}
              </span>
            </div>

            {/* EDIT BUTTON: Only visible if viewing your own profile */}
            {isOwnProfile && (
              <Button
                variant="cyan"
                onClick={() => navigate("/settings/profile")}
                className="flex items-center gap-2 py-2 px-6 shadow-brutal-sm"
              >
                <Edit3 size={18} /> Edit Profile
              </Button>
            )}
          </div>

          <p className="text-violet font-black text-xl tracking-tight">
            @{profile.username}
          </p>

          <div className="pt-4 max-w-xl">
            <h2 className="text-[10px] font-black uppercase text-ink/40 tracking-[0.2em] mb-1">
              Neural_Bio
            </h2>
            <p className="font-bold text-lg leading-tight">
              {profile.bio || "This node has not broadcasted a bio signal yet."}
            </p>
          </div>
        </div>
      </div>

      {/* STATS GRID: Data pulled from users table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow border-3 border-ink p-6 rounded-3xl shadow-brutal flex flex-col items-center text-center">
          <Award size={32} className="mb-4" />
          <div className="text-5xl font-black tabular-nums">
            {profile.karma}
          </div>
          <div className="font-black text-[10px] uppercase tracking-widest italic opacity-60">
            Karma_Points
          </div>
        </div>

        <div className="bg-violet border-3 border-ink p-6 rounded-3xl shadow-brutal flex flex-col items-center text-center text-white">
          <Activity size={32} className="mb-4" />
          <div className="text-5xl font-black tabular-nums">
            {profile.total_pulses}
          </div>
          <div className="font-black text-[10px] uppercase tracking-widest italic opacity-70">
            Pulses_Hosted
          </div>
        </div>

        <div className="bg-pink border-3 border-ink p-6 rounded-3xl shadow-brutal flex flex-col items-center text-center text-white">
          <Heart size={32} className="mb-4" fill="currentColor" />
          <div className="text-5xl font-black tabular-nums">
            {profile.notes_received}
          </div>
          <div className="font-black text-[10px] uppercase tracking-widest italic opacity-70">
            Gratitude_Notes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
