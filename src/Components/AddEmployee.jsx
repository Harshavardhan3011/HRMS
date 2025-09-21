import React, { useState } from "react";

export default function AddEmployee({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !department.trim()) {
      alert("Name, Email and Department are required.");
      return;
    }

    onAdd({
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      role,
      department: department.trim(),
    });

    setName("");
    setEmail("");
    setRole("Employee");
    setDepartment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white/10 rounded-lg text-green-300"
    >
      <h2 className="text-2xl font-semibold">Add New Employee</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900"
        placeholder="Full Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900"
        placeholder="Email"
        type="email"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900"
      >
        <option>Admin</option>
        <option>HR</option>
        <option>Employee</option>
      </select>
      <input
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="w-full p-3 rounded border border-green-600 bg-gray-900"
        placeholder="Department"
      />
      <button
        type="submit"
        className="w-full bg-green-600 py-3 rounded hover:bg-green-700 transition font-semibold"
      >
        Add Employee
      </button>
    </form>
  );
}
