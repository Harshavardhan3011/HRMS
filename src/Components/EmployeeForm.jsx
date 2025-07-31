// src/Components/EmployeeForm.jsx
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { push, ref } from "firebase/database";

export default function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "Employee",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.name || !employee.email) {
      alert("All fields are required!");
      return;
    }

    // Save to Firebase
    const employeesRef = ref(db, "employees");
    push(employeesRef, employee)
      .then(() => {
        alert("Employee added successfully!");
        setEmployee({ name: "", email: "", role: "Employee" });
      })
      .catch((err) => alert("Error adding employee: " + err.message));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-6 rounded-lg mt-8 space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>

      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Role</label>
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
        >
          <option value="Admin">Admin</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold"
      >
        Add Employee
      </button>
    </form>
  );
}
