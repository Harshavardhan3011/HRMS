import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo.png';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-br from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between text-white shadow">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="HUSREX Logo" className="h-20 w-30" />
        <span className="text-lg font-semibold hidden sm:block">HUSREX HRMS</span>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:block">
            Logged in as: <strong>{user.email}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
