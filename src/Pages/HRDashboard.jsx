import React, { useState, useEffect } from "react";
import EmployeeTable from "../Components/Employeetable";


const mockEmployees = [
  { id: "1", name: "Alice Admin", email: "alice@company.com", role: "Employee", department: "Development", joinDate: "2023-06-18" },
  { id: "2", name: "John HR", email: "john.hr@company.com", role: "HR", department: "Human Resources", joinDate: "2020-01-23" },
  { id: "3", name: "Bob Dev", email: "bob@company.com", role: "Employee", department: "Development", joinDate: "2022-02-10" }
];

const mockLeaveRequests = [
  { id: "201", userEmail: "alice@company.com", reason: "Sick", status: "Pending", createdAt: "2025-10-04" },
  { id: "202", userEmail: "bob@company.com", reason: "Family", status: "Approved", createdAt: "2025-10-02" }
];

export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    setEmployees(mockEmployees);
    setLeaveRequests(mockLeaveRequests);
  }, []);

  const handleLeaveAction = (id, status) => {
    setLeaveRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status } : req)
    );
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-6 text-green-400">HR Dashboard</h1>
      <div className="mb-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 text-center shadow">
          <div className="text-2xl text-green-400 font-bold mb-2">Total Employees</div>
          <div className="text-3xl font-extrabold text-white">{employees.length}</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 text-center shadow">
          <div className="text-2xl text-blue-300 font-bold mb-2">HR Members</div>
          <div className="text-3xl font-extrabold text-white">
            {employees.filter(emp => emp.role === "HR").length}
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6 text-center shadow">
          <div className="text-2xl text-yellow-300 font-bold mb-2">Pending Leave Requests</div>
          <div className="text-3xl font-extrabold text-white">
            {leaveRequests.filter(req => req.status === "Pending").length}
          </div>
        </div>
      </div>

      <section className="mb-10">
        <EmployeeTable
          employees={employees}
          onDelete={id => setEmployees(prev => prev.filter(emp => emp.id !== id))}
        />
      </section>

      <section>
        <h2 className="text-2xl text-green-400 font-bold mb-4">Recent Leave Requests</h2>
        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
          {leaveRequests.length === 0 ? (
            <p className="text-gray-400 italic">No leave requests found.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-green-300">
                  <th className="py-2">Employee Email</th>
                  <th className="py-2">Reason</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Requested On</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(req => (
                  <tr key={req.id} className="border-b border-green-800">
                    <td className="py-3">{req.userEmail}</td>
                    <td className="py-3">{req.reason}</td>
                    <td className="py-3">
                      <span className={
                        req.status === "Approved"
                          ? "text-green-400"
                          : req.status === "Pending"
                          ? "text-yellow-300"
                          : "text-red-400"
                      }>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3">{req.createdAt}</td>
                    <td className="py-3">
                      {req.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            className="bg-green-600 px-3 py-1 rounded font-semibold text-white hover:bg-green-700"
                            onClick={() => handleLeaveAction(req.id, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 px-3 py-1 rounded font-semibold text-white hover:bg-red-700"
                            onClick={() => handleLeaveAction(req.id, "Rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
