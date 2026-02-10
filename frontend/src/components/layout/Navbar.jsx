import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Flame, PlusSquare, User, LogOut, Award } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 font-black text-xl tracking-tight"
        >
          <Flame fill="currentColor" />
          <span>PassionPulse</span>
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Feed
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {/* Create Pulse Button */}
              <Link
                to="/create"
                className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all"
              >
                <PlusSquare size={18} />
                <span>Go Live</span>
              </Link>

              {/* Karma Display */}
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100 text-sm font-bold">
                <Award size={16} />
                {user.karma}
              </div>

              {/* Profile Link */}
              <Link
                to={`/profile/${user.id}`}
                className="text-slate-600 hover:text-indigo-600"
              >
                <User size={20} />
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
