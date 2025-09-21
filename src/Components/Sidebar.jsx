import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLinks = {
  admin: [
    { to: "/admin-dashboard", label: "Dashboard" },
    { to: "/admin-dashboard/attendance", label: "Attendance" },
    { to: "/admin-dashboard/payroll", label: "Payroll" },
    { to: "/admin-dashboard/profile", label: "My Profile" },
    { to: "/admin-dashboard/reset-password", label: "Reset Password" },
  ],
  hr: [
    { to: "/hr-dashboard", label: "Dashboard" },
    { to: "/hr-dashboard/profile", label: "My Profile" },
    { to: "/hr-dashboard/reset-password", label: "Reset Password" },
  ],
  employee: [
    { to: "/employee-dashboard", label: "Dashboard" },
    { to: "/employee-dashboard/chat", label: "Chat" },
    { to: "/employee-dashboard/attendance", label: "Attendance" },
    { to: "/employee-dashboard/profile", label: "My Profile" },
    { to: "/employee-dashboard/reset-password", label: "Reset Password" },
  ],
};

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  const links = SidebarLinks[role] || [];

  return (
    <aside className="w-full sm:w-64 bg-gradient-to-br from-[#060110] via-[#0b0515] to-[#f40606] text-white p-6 border-r border-white/20 min-h-screen">
      <h2 className="text-2xl font-extrabold mb-8 text-green-400 select-none">
        {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Panel` : "Panel"}
      </h2>

      <nav className="flex flex-col space-y-3">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "block px-4 py-3 rounded-lg hover:bg-white/20 font-semibold transition",
                isActive ? "bg-white/20 font-bold text-green-400" : "text-white",
              ].join(" ")
            }
            end
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
