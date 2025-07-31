import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-white/10 transition ${
      isActive ? 'bg-white/10 font-bold' : ''
    }`;

  const menuItems = {
    admin: [{ path: '/admin-dashboard', label: 'Admin Dashboard' }],
    HR: [{ path: '/hr-dashboard', label: 'HR Dashboard' }],
    employee: [
      { path: '/employee-dashboard', label: 'Employee Dashboard' },
      { path: '/employee/chat', label: 'Chat' },
    ],
  };

  return (
    <aside className="w-full sm:w-64 bg-black/20 text-white p-4 border-r border-white/10">
      <h2 className="text-xl font-bold mb-6">{role ? `${role} Panel` : 'Panel'}</h2>
      <nav className="space-y-2">
        {role && menuItems[role]?.map((item) => (
          <NavLink key={item.path} to={item.path} className={navLinkClass}>
            {item.label}
          </NavLink>
        ))}
        <NavLink to="/profile" className={navLinkClass}>My Profile</NavLink>
        <NavLink to="/reset-password" className={navLinkClass}>Reset Password</NavLink>
      </nav>
    </aside>
  );
}
