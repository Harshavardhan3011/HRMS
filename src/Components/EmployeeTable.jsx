import React, { useState } from "react";

export default function EmployeeTable({ employees = [], onDelete = () => {}, onEdit = () => {} }) {
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      (emp.department?.toLowerCase().includes(search.toLowerCase()) || false)
  );

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl shadow-lg max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-extrabold mb-6 border-b border-green-600 pb-2 text-green-400">
        Employee Directory
      </h2>
      <input
        type="text"
        placeholder="Search by name, email, or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 mb-6 rounded border border-green-600 bg-gray-900 placeholder-green-600 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {filteredEmployees.length === 0 ? (
        <p className="text-gray-400 italic text-center text-lg py-8">No employees found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-green-900 text-green-400 uppercase tracking-wide">
                <th className="py-3 px-6 rounded-tl-lg">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-6">Join Date</th>
                <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-green-700 hover:bg-green-800 cursor-pointer transition">
                  <td className="py-4 px-6 font-medium">{emp.name}</td>
                  <td className="py-4 px-6">{emp.email}</td>
                  <td className="py-4 px-6">
                    <span className={
                      emp.role === "HR"
                        ? "text-blue-300 font-bold"
                        : emp.role === "Employee"
                        ? "text-green-300 font-bold"
                        : "text-yellow-300 font-bold"
                    }>
                      {emp.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">{emp.department || <span className="text-gray-400">-</span>}</td>
                  <td className="py-4 px-6">{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : <span className="text-gray-400">-</span>}</td>
                  <td className="py-4 px-6 text-center flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(emp.id)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm transition"
                      aria-label={`Edit employee ${emp.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(emp.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm transition"
                      aria-label={`Delete employee ${emp.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
