import React, { useState } from "react";


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
      className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl mt-10 max-w-md mx-auto space-y-6 shadow-lg text-white"
    >
      <h2 className="text-3xl font-extrabold mb-6 border-b border-green-600 pb-2 text-green-400">
        Add New Employee
      </h2>

      <div>
        <label className="block text-green-400 text-sm mb-1 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 placeholder-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-green-400 text-sm mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 placeholder-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-green-400 text-sm mb-1 font-semibold">Role</label>
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Admin">Admin</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded font-semibold w-full"
      >
        Add Employee
      </button>
    </form>
  );
}
