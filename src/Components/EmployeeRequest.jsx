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
      <h1 className="text-3xl font-bold mb-6 text-green-400">My Leave Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-400 italic text-center py-10">
          No leave requests submitted yet.
        </p>
      ) : (
        <ul className="divide-y divide-white/20 border border-white/20 rounded-md max-w-3xl mx-auto">
          {requests.map((req) => (
            <li
              key={req.id}
              className="flex justify-between px-6 py-4 text-white hover:bg-white/10 transition cursor-pointer"
            >
              <span>{req.reason}</span>
              <span
                className={`text-sm font-semibold ${
                  req.status.toLowerCase() === "approved"
                    ? "text-green-400"
                    : req.status.toLowerCase() === "pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {req.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
