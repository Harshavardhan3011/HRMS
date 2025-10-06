import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { routeConfig } from "../routesConfig";


export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();
  const links = routeConfig[role] || [];
  const location = useLocation();

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg hover:bg-white/20 transition font-semibold ${
      isActive ? "bg-white/20 font-bold text-green-400" : "text-white"
    }`;

  // Figure out the dashboard base (e.g., "admin-dashboard")
  const dashboardBase = `${role}-dashboard`;

  return (
    <aside className="w-full sm:w-64 bg-gradient-to-b from-[#020617] via-[#1e293b] to-[#0f172a] text-white p-6 border-r border-white/20 min-h-screen">
      <h2 className="text-2xl font-extrabold mb-8 text-green-400 select-none">
        {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Panel` : "Panel"}
      </h2>
      <nav className="flex flex-col space-y-3">
        {links.map(link => (
          <NavLink
            key={link.path || "dashboard"}
            // "" refers to index (dashboard root page), so don't add an extra slash
            to={link.path}
            className={navLinkClass}
            end={link.path === ""}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
