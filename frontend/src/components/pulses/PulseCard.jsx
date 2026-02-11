import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import GratitudeForm from "../GratitudeForm";
import { ExternalLink, Heart, User as UserIcon } from "lucide-react";

const PulseCard = ({ pulse }) => {
  const { user } = useAuth();
  const [showGratitude, setShowGratitude] = useState(false);

  // Logic: Users shouldn't thank themselves. Linked to DB creator_id.
  const isOwner = user?.id === pulse.creator_id;

  return (
    <div className="bg-white border-3 border-ink p-6 rounded-2xl shadow-brutal-lg transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal group">
      {/* HEADER: Category and Karma */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-green border-3 border-ink px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
          {pulse.vibe_category || "General"}
        </span>
        <div className="text-sm font-black italic underline decoration-pink decoration-4 underline-offset-2">
          {pulse.karma ?? 0} KP
        </div>
      </div>

      {/* BODY: Title and Description */}
      <h3 className="text-2xl font-black leading-none mb-2 group-hover:text-violet transition-colors">
        {pulse.title}
      </h3>
      <p className="text-ink/70 font-bold mb-6 line-clamp-2 leading-tight">
        {pulse.description}
      </p>

      {/* USER INFO: Linked to DB User Object */}
      <div className="flex items-center justify-between text-sm font-bold mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan border-3 border-ink rounded-full flex items-center justify-center shadow-brutal-sm">
            <UserIcon size={18} />
          </div>
          <div className="leading-tight">
            <div className="text-ink font-black italic">
              @{pulse.username || "anonymous"}
            </div>
            <div className="text-ink/50 text-[10px] uppercase tracking-tighter">
              {pulse.interest_name || "Member"}
            </div>
          </div>
        </div>
        {/* Neon Green "Live" Tag */}
        <span className="bg-green border-3 border-ink px-2 py-0.5 rounded text-[10px] font-black uppercase">
          Live
        </span>
      </div>

      {/* ACTIONS: Join and Gratitude */}
      <div className="flex gap-3">
        <a
          href={pulse.meeting_link}
          target="_blank"
          rel="noreferrer"
          className="flex-1"
        >
          <Button
            variant="yellow"
            className="w-full flex items-center justify-center gap-2 py-2"
          >
            Join <ExternalLink size={16} />
          </Button>
        </a>

        {/* DB PROTECTION: Only show 'Thank' if logged in and not the owner */}
        {user && !isOwner && (
          <Button
            variant="outline"
            className="px-4"
            onClick={() => setShowGratitude(!showGratitude)}
          >
            <Heart
              size={20}
              className={showGratitude ? "fill-pink text-pink" : "text-ink"}
            />
          </Button>
        )}
      </div>

      {/* CONDITIONAL FORM: Gratitude Flow */}
      {showGratitude && (
        <div className="mt-4 p-4 border-3 border-ink rounded-xl bg-violet/5 animate-in slide-in-from-top-2 duration-300">
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
