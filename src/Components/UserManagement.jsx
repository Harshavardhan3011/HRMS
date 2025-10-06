import React, { useState } from "react";

const mockUsers = [
  { id: 1, name: "Alice", email: "alice@company.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@company.com", role: "Employee" },
  { id: 3, name: "John", email: "john@company.com", role: "HR" },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  // ...Add modals for add/edit as desired!
  return (
    <div className="p-8 bg-white/10 rounded-xl text-white shadow-lg max-w-5xl mx-auto mt-6">
      <h2 className="text-3xl font-extrabold mb-6 text-green-400">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left mt-4">
          <thead className="text-green-300 bg-green-900">
            <tr>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-green-700">
                <td className="py-2 px-3">{u.name}</td>
                <td className="py-2 px-3">{u.email}</td>
                <td className="py-2 px-3">{u.role}</td>
                <td className="py-2 px-3 text-right flex gap-2 justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Edit</button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
