import React, { useState, useEffect } from "react";

export default function AdminPayroll() {
  const [employees, setEmployees] = useState([
    { id: "1", name: "Alice Smith", email: "alice@example.com" },
    { id: "2", name: "Bob Johnson", email: "bob@example.com" },
    { id: "3", name: "Carol White", email: "carol@example.com" },
    // ...more employees
  ]);
  const [search, setSearch] = useState("");
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!selectedEmployeeEmail || !basicSalary) {
      alert("Please select an employee and enter basic salary.");
      return;
    }
    // Submit payroll logic here, e.g. update state or API call
    alert(`Payroll saved for ${selectedEmployeeEmail}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-[#060110] via-[#0b0515] to-[#f40606] p-6 rounded-lg shadow-lg text-green-300">
      <h2 className="text-2xl font-semibold mb-6">Add Payroll Entry</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employee by name"
        className="w-full mb-3 px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <select
        value={selectedEmployeeEmail}
        onChange={(e) => setSelectedEmployeeEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded border border-green-600 bg-gray-900 text-green-300"
      >
        <option value="">-- Select Employee --</option>
        {filteredEmployees.map((emp) => (
          <option key={emp.id} value={emp.email}>
            {emp.name} ({emp.email})
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Basic Salary"
        value={basicSalary}
        onChange={(e) => setBasicSalary(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300"
      />

      <input
        type="number"
        placeholder="Allowances"
        value={allowances}
        onChange={(e) => setAllowances(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300"
      />

      <input
        type="number"
        placeholder="Deductions"
        value={deductions}
        onChange={(e) => setDeductions(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 py-3 rounded hover:bg-green-700 font-semibold"
      >
        Save Payroll
      </button>
    </div>
  );
}
