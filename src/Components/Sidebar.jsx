import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../routesConfig";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  // Filter routes by role
  const sidebarRoutes = routes.filter((route) => route.roles.includes(role));

  // NavLink class helper
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg hover:bg-white/20 transition font-semibold ${
      isActive ? "bg-white/20 font-bold text-green-400" : "text-white"
    }`;

  return (
    <aside className="w-full sm:w-64 bg-gradient-to-b from-[#020617] via-[#1e293b] to-[#0f172a] text-white p-6 border-r border-white/20 min-h-screen">
      <h2 className="text-2xl font-extrabold mb-8 text-green-400 select-none">
        {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Panel` : "Panel"}
      </h2>

      <nav className="flex flex-col space-y-3">
        {sidebarRoutes.map((route) => {
          const baseDashboardPath = `/${role}-dashboard`;
          const fullPath =
            route.path === `/${role}-dashboard`
              ? route.path
              : `${baseDashboardPath}${route.path.replace(`/${role}-dashboard`, "")}`;

          return (
            <NavLink
              key={route.path}
              to={fullPath}
              className={navLinkClass}
              end={fullPath === `/${role}-dashboard`}
            >
              {route.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
