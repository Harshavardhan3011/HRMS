import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

// Utility for avatar and name logic
function getUserDisplayName(user) {
  if (user?.name) return user.name;
  if (user?.email) return user.email.split("@")[0];
  return "User";
}

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    // Optionally, provide a loading skeleton or minimal guest header.
    return (
      <header className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] h-16 flex items-center justify-between px-6 shadow-lg">
        <div className="w-52 bg-gray-800 h-8 rounded animate-pulse"></div>
        <div className="w-32 bg-gray-800 h-8 rounded animate-pulse"></div>
      </header>
    );
  }

  const dashboard =
    user.role === "admin"
      ? "/admin-dashboard"
      : user.role === "hr"
      ? "/hr-dashboard"
      : "/employee-dashboard";

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      setLoading(false);
      navigate("/login");
    }, 700);
  };

  const displayName = getUserDisplayName(user);

  return (
    <header className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] px-6 py-3 flex items-center justify-between text-green-300 shadow-lg sticky top-0 z-30">
      <h1
        onClick={() => navigate(dashboard)}
        className="text-3xl font-extrabold cursor-pointer select-none hover:text-green-400 transition"
        title="Go to Dashboard"
        tabIndex={0}
        role="link"
        aria-label="Go to Dashboard"
      >
        <span className="text-green-400">Company</span> Logo
      </h1>
      <nav aria-label="Top nav" className="flex items-center gap-5 relative">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-1 rounded-full hover:bg-white/10 transition focus:ring focus:ring-green-300"
        >
          <BellIcon className="w-6 h-6 text-green-400" />
          <span className="absolute top-0 right-0 block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
        </button>
        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 outline-none focus:ring focus:ring-green-400 px-2 py-1 rounded cursor-pointer hover:bg-white/10 transition"
            aria-label="User menu"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
          >
            <UserCircleIcon className="w-7 h-7 text-green-400" />
            <span className="hidden sm:inline font-semibold text-white">{displayName}</span>
            <svg
              className={`w-4 h-4 text-green-300 ml-1 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              role="menu"
              aria-orientation="vertical"
              aria-label="User menu"
              className="absolute right-0 mt-2 w-44 bg-[#1e293b] rounded-md shadow-lg py-1 z-40 ring-1 ring-green-600"
              tabIndex={-1}
              onBlur={() => setDropdownOpen(false)}
            >
              <div className="px-4 py-2 flex items-center gap-2 text-green-400 font-semibold text-base select-none border-b border-green-700">
                <UserCircleIcon className="w-5 h-5" /> {displayName}
              </div>
              <button
                onClick={handleLogout}
                disabled={loading}
                className={`block w-full text-left px-4 py-2 text-sm transition ${
                  loading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500 hover:bg-red-600 hover:text-white"
                }`}
                role="menuitem"
              >
                {loading ? "Signing out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
