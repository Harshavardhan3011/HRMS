import React, { useState } from "react";

export default function EmployeeTable({ employees = [], onDelete }) {
  const [search, setSearch] = useState("");

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-full overflow-auto">
      <input
        type="text"
        placeholder="Search name, email or department"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-gray-800 text-green-300 border border-green-600"
      />
      <table className="w-full text-left border-collapse border border-green-700 rounded-lg text-green-300">
        <thead>
          <tr className="bg-green-900">
            <th className="p-3 border border-green-700">Name</th>
            <th className="p-3 border border-green-700">Email</th>
            <th className="p-3 border border-green-700">Role</th>
            <th className="p-3 border border-green-700">Department</th>
            <th className="p-3 border border-green-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp) => (
            <tr key={emp.id} className="hover:bg-green-800 transition cursor-pointer">
              <td className="p-3 border border-green-700">{emp.name}</td>
              <td className="p-3 border border-green-700">{emp.email}</td>
              <td className="p-3 border border-green-700">{emp.role}</td>
              <td className="p-3 border border-green-700">{emp.department || "-"}</td>
              <td className="p-3 border border-green-700">
                <button
                  onClick={() => onDelete(emp.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="p-3 text-center text-gray-400">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
