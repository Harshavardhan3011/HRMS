import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Mock check - replace with real API for production
    const allUsers = ['admin@hrms.com', 'hr@hrms.com', 'emp@hrms.com'];
    if (allUsers.includes(email)) {
      setMessage('✅ A password reset link has been sent to your email.');
      setTimeout(() => navigate('/login'), 3000);
    } else {
      setMessage('❌ No account found with this email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md text-white shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.startsWith('✅') ? 'text-green-400' : 'text-red-400'
            }`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-4" aria-label="Forgot Password Form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            aria-required="true"
            aria-describedby="emailHelp"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
