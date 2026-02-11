import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { LogOut, LogIn, Activity, User as UserIcon } from "lucide-react";

export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("LOGOUT_INTERRUPTED", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-offwhite border-b-3 border-ink p-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-black italic tracking-tighter hover:scale-105 transition-transform"
        >
          PASSION<span className="text-violet">PULSE</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to="/"
            className={`font-black uppercase text-sm tracking-tight ${
              pathname === "/"
                ? "text-pink underline decoration-4 underline-offset-4"
                : "hover:text-violet"
            }`}
          >
            Feed
          </Link>

          {user ? (
            <>
              {/* DYNAMIC PROFILE LINK: Uses user.id from AuthContext/Database */}
              <Link
                to={`/profile/${user.id}`}
                className={`font-black uppercase text-sm tracking-tight hidden md:flex items-center gap-2 ${
                  pathname === `/profile/${user.id}`
                    ? "text-pink underline decoration-4 underline-offset-4"
                    : "hover:text-violet"
                }`}
              >
                <UserIcon size={16} /> Profile
              </Link>

              <Link to="/create">
                <Button variant="yellow" className="py-2 text-xs px-4">
                  <Activity size={14} className="mr-1" /> Go Live
                </Button>
              </Link>

              <Button
                variant="pink"
                className="py-2 text-xs px-4 shadow-brutal-sm"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-1" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                variant="cyan"
                className="py-2 text-xs px-6 shadow-brutal-sm"
              >
                <LogIn size={16} className="mr-1" /> Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
