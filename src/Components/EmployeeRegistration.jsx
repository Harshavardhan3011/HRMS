import React, { useState } from "react";

export default function EmployeeRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/employees/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setMessage("✅ Employee registered successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setRole("Employee");
      } else {
        const errorData = await response.json();
        setMessage("❌ Error: " + (errorData.message || "Registration failed"));
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl max-w-md mx-auto mt-10 space-y-6 shadow-lg text-white"
    >
      <h2 className="text-3xl font-extrabold mb-6 border-b border-green-600 pb-2 text-green-400">
        Register Employee
      </h2>

      {message && (
        <p
          className={`text-center ${
            message.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 placeholder-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 placeholder-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 placeholder-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="Admin">Admin</option>
        <option value="HR">HR</option>
        <option value="Employee">Employee</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded font-semibold w-full"
      >
        Register Employee
      </button>
    </form>
  );
}
