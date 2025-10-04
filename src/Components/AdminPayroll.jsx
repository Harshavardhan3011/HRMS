import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function AdminPayroll() {
  const [employees, setEmployees] = useState([]);
  const [payroll, setPayroll] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");

  const currentMonth = dayjs().format("YYYY-MM");

  useEffect(() => {
    async function fetchData() {
      try {
        const empRes = await fetch("/api/employees");
        const empData = await empRes.json();
        setEmployees(empData || []);

        const payrollRes = await fetch("/api/payroll");
        const payrollData = await payrollRes.json();
        setPayroll(payrollData || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedEmployee || !basicSalary) {
      alert("Please select an employee and enter salary");
      return;
    }

    const emailKey = selectedEmployee.replace(/\./g, "_");
    const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

    try {
      const response = await fetch(`/api/payroll/${emailKey}/${currentMonth}`, {
        method: "POST", // Or PUT depending on API design
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          basicSalary: Number(basicSalary),
          allowances: Number(allowances || 0),
          deductions: Number(deductions || 0),
          netSalary,
          paid: false,
          createdAt: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        alert("Payroll entry added successfully!");
        // Optionally re-fetch payroll data or update state locally
      } else {
        alert("Error adding payroll entry");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }

    setBasicSalary("");
    setAllowances("");
    setDeductions("");
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl mt-10 shadow-lg max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-extrabold mb-6 border-b border-green-600 pb-2 text-green-400">
        Payroll Management
      </h2>

      {/* Payroll Entry Form */}
      <div className="space-y-4 mb-8">
        <select
          className="w-full p-3 rounded bg-gray-900 border border-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
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
          className="w-full p-3 rounded bg-gray-900 border border-green-600 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          placeholder="Allowances"
          value={allowances}
          onChange={(e) => setAllowances(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-green-600 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          placeholder="Deductions"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          className="w-full p-3 rounded bg-gray-900 border border-green-600 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded font-semibold w-full"
        >
          Add Payroll Entry
        </button>
      </div>

      {/* Payroll List */}
      <h3 className="text-2xl mb-4 text-green-400">Payroll Records (Current Month)</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left text-green-300">
          <thead>
            <tr className="bg-green-900 uppercase tracking-wide text-green-400">
              <th className="py-3 px-6 rounded-tl-lg">Employee</th>
              <th className="py-3 px-6">Net Salary</th>
              <th className="py-3 px-6 rounded-tr-lg">Paid?</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(payroll).map(([emailKey, months]) => {
              const record = months[currentMonth];
              if (!record) return null;
              return (
                <tr
                  key={emailKey}
                  className="border-b border-green-700 hover:bg-green-800 transition cursor-pointer"
                >
                  <td className="py-3 px-6 font-medium">{emailKey.replace(/_/g, ".")}</td>
                  <td className="py-3 px-6">{record.netSalary}</td>
                  <td className="py-3 px-6">{record.paid ? "✅ Paid" : "❌ Pending"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
