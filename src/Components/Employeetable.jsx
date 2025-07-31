// src/Components/Employeetable.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, remove } from "firebase/database";

export default function Employeetable() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const employeesRef = ref(db, "employees");
    onValue(employeesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const employeeList = Object.entries(data).map(([id, emp]) => ({
        id,
        ...emp,
      }));
      setEmployees(employeeList);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      remove(ref(db, `employees/${id}`))
        .then(() => alert("Employee deleted successfully!"))
        .catch((err) => alert("Error deleting employee: " + err.message));
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white/10 p-6 rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded bg-white/10 border border-white/30 text-white"
      />

      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr
              key={emp.id}
              className="border-b border-gray-700 hover:bg-white/5"
            >
              <td className="py-2">{emp.name}</td>
              <td className="py-2">{emp.email}</td>
              <td className="py-2">{emp.role}</td>
              <td className="py-2 text-center">
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
