import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import {
  LogOut,
  LogIn,
  Activity,
  User as UserIcon,
  Home as HomeIcon,
} from "lucide-react";

export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-offwhite border-b-3 border-ink p-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-4xl font-black italic tracking-tighter text-black [text-shadow:3px_3px_0px_#A358FF]"
        >
          SKILL<span className="text-[#A358FF]">CAST</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to="/"
            className={`font-black uppercase text-sm tracking-tight flex items-center gap-2 ${
              pathname === "/"
                ? "text-[#A358FF] underline decoration-4 underline-offset-4"
                : "hover:text-[#A358FF]"
            }`}
          >
            <HomeIcon size={16} /> Casts
          </Link>

          {user ? (
            <>
              {/* DYNAMIC PROFILE LINK: Uses user.id from AuthContext/Database */}
              <Link
                to={`/profile/${user.id}`}
                className={`font-black uppercase text-sm tracking-tight hidden md:flex items-center gap-2 ${
                  pathname === `/profile/${user.id}`
                    ? "text-[#A358FF] underline decoration-4 underline-offset-4"
                    : "hover:text-[#A358FF]"
                }`}
              >
                <UserIcon size={16} /> Profile
              </Link>

              <Link to="/create">
                <button className="bg-[#00FF85] border-3 border-black px-4 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  START_CASTING
                </button>
              </Link>

              <Button
                variant="cyan"
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
