// src/Pages/EmployeeRequests.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Pages/DashboardLayout";

export default function EmployeeRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    setRequests(storedRequests);
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">My Leave Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-400">No leave requests submitted yet.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req) => (
            <li
              key={req.id}
              className="flex justify-between border-b border-white/20 py-2"
            >
              <span>{req.reason}</span>
              <span className="text-sm text-gray-300">{req.status}</span>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
