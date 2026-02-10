import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { User, Award, Activity } from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Fetches data including total_pulses and notes_received
      const res = await api.get(`/users/profile/${id}`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <div className="p-8">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
        <div className="flex items-center gap-6 mb-8">
          <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <User size={48} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {profile.name || profile.username}
            </h1>
            <p className="text-slate-500">@{profile.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <Award className="mx-auto mb-2 text-amber-500" />
            <div className="text-2xl font-bold">{profile.karma}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Karma Points
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <Activity className="mx-auto mb-2 text-indigo-500" />
            <div className="text-2xl font-bold">{profile.total_pulses}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Pulses Hosted
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg text-center">
            <User className="mx-auto mb-2 text-emerald-500" />
            <div className="text-2xl font-bold">{profile.notes_received}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">
              Gratitude Notes
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="font-semibold mb-2">About</h2>
          <p className="text-slate-600">{profile.bio || "No bio yet."}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
