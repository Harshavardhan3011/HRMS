import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import dayjs from "dayjs";

export default function EmployeeDashboard() {
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState(() => {
    // Load saved requests from localStorage or start empty
    const saved = localStorage.getItem("leaveRequests");
    return saved ? JSON.parse(saved) : [];
  });
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : {};
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const today = dayjs().format("YYYY-MM-DD");
  const emailKey = user?.email?.replace(/\./g, "_");

  // Save requests to localStorage when changed
  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(requests));
  }, [requests]);

  // Save attendance to localStorage when changed
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const submitRequest = (e) => {
    e.preventDefault();
    if (!reason.trim()) return alert("Please enter a reason for leave.");

    const newRequest = {
      id: Date.now().toString(),
      userEmail: user?.email || "Unknown",
      reason,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setRequests((prev) => [newRequest, ...prev]);
    setReason("");
    alert("Leave request submitted successfully!");
  };

  const handleClockIn = () => {
    if (attendance[emailKey]?.[today]?.clockIn) {
      alert("Already clocked in today.");
      return;
    }
    const clockInTime = dayjs().format("HH:mm:ss");
    setAttendance((prev) => ({
      ...prev,
      [emailKey]: {
        ...prev[emailKey],
        [today]: { ...(prev[emailKey]?.[today] || {}), clockIn: clockInTime },
      },
    }));
    alert(`Clock-In recorded at ${clockInTime}`);
  };

  const handleClockOut = () => {
    if (!attendance[emailKey]?.[today]?.clockIn) {
      alert("You must clock in first.");
      return;
    }
    if (attendance[emailKey]?.[today]?.clockOut) {
      alert("Already clocked out today.");
      return;
    }
    const clockOutTime = dayjs().format("HH:mm:ss");
    setAttendance((prev) => ({
      ...prev,
      [emailKey]: {
        ...prev[emailKey],
        [today]: { ...(prev[emailKey]?.[today] || {}), clockOut: clockOutTime },
      },
    }));
    alert(`Clock-Out recorded at ${clockOutTime}`);
  };

  // Filter requests only for current user
  const userRequests = requests.filter((req) => req.userEmail === user?.email);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-extrabold mb-6 text-green-400">Employee Dashboard</h1>
      <p className="text-gray-300 mb-8">Submit leave requests and track your attendance.</p>

      {/* Attendance Section */}
      <div className="bg-white/10 p-6 rounded-lg mb-10 shadow-inner">
        <h2 className="text-xl font-semibold mb-5 text-green-300">Attendance</h2>
        <div className="flex gap-5 mb-5">
          <button
            onClick={handleClockIn}
            disabled={!!attendance[emailKey]?.[today]?.clockIn}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              attendance[emailKey]?.[today]?.clockIn ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            disabled={
              !attendance[emailKey]?.[today]?.clockIn || !!attendance[emailKey]?.[today]?.clockOut
            }
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              !attendance[emailKey]?.[today]?.clockIn || attendance[emailKey]?.[today]?.clockOut
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Clock Out
          </button>
        </div>
        <p className="text-green-300 font-medium">
          Clock-In: {attendance[emailKey]?.[today]?.clockIn || "Not yet"} | Clock-Out:{" "}
          {attendance[emailKey]?.[today]?.clockOut || "Not yet"}
        </p>
      </div>

      {/* Leave Request Form */}
      <form onSubmit={submitRequest} className="bg-white/10 p-6 rounded-lg mb-10 space-y-5 shadow-inner">
        <label className="block text-sm text-green-300 font-semibold">Reason for Leave</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g., Sick leave, Personal work..."
          className="w-full px-5 py-3 rounded border border-green-600 bg-gray-900 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded font-semibold text-white w-full transition"
        >
          Submit Request
        </button>
      </form>

      {/* Employee Leave Requests Table */}
      <div className="bg-white/10 p-6 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-5 text-green-300">My Leave Requests</h2>
        {userRequests.length === 0 ? (
          <p className="text-gray-400 italic text-center py-6">No leave requests submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left text-green-300 border border-green-600 rounded-lg">
              <thead>
                <tr className="bg-green-900 text-green-400 uppercase tracking-wide">
                  <th className="py-3 px-6 rounded-tl-lg">Reason</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 rounded-tr-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-green-700 hover:bg-green-800 cursor-pointer transition"
                  >
                    <td className="py-3 px-6">{req.reason}</td>
                    <td
                      className={`py-3 px-6 font-semibold ${
                        req.status === "Approved"
                          ? "text-green-400"
                          : req.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="py-3 px-6">
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
