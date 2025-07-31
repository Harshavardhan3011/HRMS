// src/Components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const credentials = {
      admin: { email: 'admin@gmail.com', password: 'admin123' },
      HR: { email: 'hr@gmail.com', password: 'hr123' },
      employee: { email: 'emp@gmail.com', password: 'emp123' },
    };

    const validUser = credentials[role];
    if (validUser && validUser.email === email && validUser.password === password) {
      localStorage.setItem('user', JSON.stringify({ email, role }));

      switch (role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'HR':
          navigate('/hr-dashboard');
          break;
        case 'employee':
          navigate('/employee-dashboard');
          break;
        default:
          setError('Invalid role selected');
      }
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex flex-col items-center justify-center relative px-4">
      <img src="src/Assets/Logo.png" alt="HUSREX" className="h-40 w-auto mb-4" />
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md text-white shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Login to your account</h2>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-black/30 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="admin" className="text-black">Admin</option>
              <option value="HR" className="text-black">HR</option>
              <option value="employee" className="text-black">Employee</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-indigo-300 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
