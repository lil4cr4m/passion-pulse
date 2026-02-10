import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import GratitudeForm from "../GratitudeForm";
import { ExternalLink, Heart, User as UserIcon } from "lucide-react";

const PulseCard = ({ pulse }) => {
  const { user } = useAuth();
  const [showGratitude, setShowGratitude] = useState(false);

  // Logic: Users shouldn't thank themselves
  const isOwner = user?.id === pulse.creator_id;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
            {pulse.vibe_category}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            {pulse.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg text-sm font-bold">
          <span>{pulse.karma}</span>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-6 line-clamp-2">
        {pulse.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
            <UserIcon size={16} />
          </div>
          <span className="text-sm font-medium text-slate-700">
            {pulse.username}
          </span>
        </div>

        <div className="flex gap-2">
          {/* Only show gratitude button if logged in and NOT the owner */}
          {user && !isOwner && (
            <Button
              variant="outline"
              className="p-2"
              onClick={() => setShowGratitude(!showGratitude)}
            >
              <Heart
                size={18}
                className={showGratitude ? "fill-rose-500 text-rose-500" : ""}
              />
            </Button>
          )}

          <a href={pulse.meeting_link} target="_blank" rel="noreferrer">
            <Button className="h-10 px-4">
              Join <ExternalLink size={16} />
            </Button>
          </a>
        </div>
      </div>

      {showGratitude && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
          <GratitudeForm
            pulseId={pulse.id}
            onNoteSent={() => setTimeout(() => setShowGratitude(false), 2000)}
          />
        </div>
      )}
    </div>
  );
};

export default PulseCard;
