import React, { useEffect, useState } from "react";

const mockLeaveRequests = [
  {
    id: "1",
    userEmail: "employee1@example.com",
    reason: "Medical leave",
    status: "Pending",
  },
  {
    id: "2",
    userEmail: "employee2@example.com",
    reason: "Vacation",
    status: "Approved",
  },
  {
    id: "3",
    userEmail: "employee3@example.com",
    reason: "Personal work",
    status: "Rejected",
  },
];

export default function RequestManager() {
  const [requests, setRequests] = useState([]);

  // Mimic fetching leave requests on mount (can be replaced with API call)
  useEffect(() => {
    // Load mock requests, latest first
    setRequests([...mockLeaveRequests].reverse());
  }, []);

  // Handle approve/reject
  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
  };

  // Delete request handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
      alert("Request deleted successfully!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl mt-10 shadow-lg max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-extrabold mb-6 border-b border-green-600 pb-2 text-green-400">
        Leave Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-400 text-center py-10 italic">
          No leave requests yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border-collapse border border-green-700 rounded-lg">
            <thead>
              <tr className="bg-green-900 text-green-400 uppercase tracking-wide">
                <th className="py-3 px-6 rounded-tl-lg">Employee Email</th>
                <th className="py-3 px-6">Reason</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-green-700 hover:bg-green-800 transition cursor-pointer"
                >
                  <td className="py-4 px-6 font-medium">{req.userEmail || "Unknown"}</td>
                  <td className="py-4 px-6">{req.reason}</td>
                  <td className="py-4 px-6 font-semibold">{req.status || "Pending"}</td>
                  <td className="py-4 px-6 space-x-2 text-center">
                    <button
                      onClick={() => handleAction(req.id, "Approved")}
                      disabled={req.status !== "Pending"}
                      className={`px-3 py-1 rounded ${
                        req.status === "Pending"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-600 cursor-not-allowed"
                      } text-white transition`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "Rejected")}
                      disabled={req.status !== "Pending"}
                      className={`px-3 py-1 rounded ${
                        req.status === "Pending"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-600 cursor-not-allowed"
                      } text-white transition`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="px-3 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-white transition"
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
