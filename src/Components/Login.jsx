import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mockUsers = {
    admin: { email: "admin1@gmail.com", password: "admin@123" },
    hr: { email: "hr1@gmail.com", password: "hr@123" },
    employee: { email: "emp1@gmail.com", password: "emp@123" },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!role) {
      setError("Please select a role.");
      setLoading(false);
      return;
    }

    const user = mockUsers[role];
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("user", JSON.stringify({ email: user.email, role }));
      setLoading(false);

      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "hr") navigate("/hr-dashboard");
      else navigate("/employee-dashboard");
    } else {
      setError("Invalid email or password for the selected role.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex flex-col items-center justify-center px-4">
      <img alt="Company Logo" className="h-28 mb-6" />

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md text-white shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6" aria-label="Login Form">
          <div>
            <label className="block text-sm mb-1">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="admin" className="text-black">
                Admin
              </option>
              <option value="hr" className="text-black">
                HR
              </option>
              <option value="employee" className="text-black">
                Employee
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="text-right mt-1">
              <a href="/forgot-password" className="text-sm text-indigo-300 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
