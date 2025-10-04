import React, { useState } from "react";


export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white px-4">
      <div className="bg-white/10 p-8 rounded-xl shadow-md w-full max-w-md backdrop-blur-md border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
          Reset Password
        </h2>
        {message && <p className="text-green-400 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form onSubmit={handleReset} className="space-y-6" aria-label="Reset Password Form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            aria-required="true"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
