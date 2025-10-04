import React, { useState } from "react";

export default function AddEmployee({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Name and Email are required.");
      return;
    }

    const newEmployee = {
      id: Date.now().toString(), // simple unique id
      name: name.trim(),
      email: email.trim(),
      role,
    };

    onAdd(newEmployee);
    setName("");
    setEmail("");
    setRole("Employee");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white/10 rounded-lg shadow-md">
      <h2 className="text-2xl text-green-400 font-semibold mb-4">Add New Employee</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="Admin">Admin</option>
        <option value="HR">HR</option>
        <option value="Employee">Employee</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 w-full py-3 rounded font-semibold text-white transition"
      >
        Add Employee
      </button>
    </form>
  );
}
