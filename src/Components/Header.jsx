import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] px-6 py-4 flex items-center justify-between text-green-300 shadow-lg">
      <h1
        className="text-3xl font-extrabold cursor-pointer select-none hover:text-green-400 transition"
        onClick={() =>
          navigate(
            user?.role === 'admin'
              ? '/admin-dashboard'
              : user?.role === 'HR'
              ? '/hr-dashboard'
              : '/employee-dashboard'
          )
        }
        title="Go to Dashboard"
      >
        Company Logo
      </h1>

      {user && (
        <div className="flex items-center gap-6">
          <span className="text-sm hidden sm:block select-text">
            Logged in as: <strong className="text-white">{user.email}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
