import React, { useEffect, useState } from "react";
import AttendanceHistory from "../Components/AttendanceHistory";

export default function EmployeeDashboard() {
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("leaveRequests");
    return saved ? JSON.parse(saved) : [];
  });
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : {};
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const today = new Date().toISOString().slice(0, 10);
  const emailKey = user?.email?.replace(/\./g, "_");

  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(requests));
  }, [requests]);

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
      createdAt: new Date().toISOString().slice(0, 10),
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
    const clockInTime = new Date().toTimeString().slice(0, 8);
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
    const clockOutTime = new Date().toTimeString().slice(0, 8);
    setAttendance((prev) => ({
      ...prev,
      [emailKey]: {
        ...prev[emailKey],
        [today]: { ...(prev[emailKey]?.[today] || {}), clockOut: clockOutTime },
      },
    }));
    alert(`Clock-Out recorded at ${clockOutTime}`);
  };

  // Prepare attendance history for the user
  const attnHistory = Object.entries(attendance[emailKey] || {}).map(([date, entry]) => ({
    date,
    clockIn: entry.clockIn,
    clockOut: entry.clockOut
  }));

  // Only current user's leave requests
  const userRequests = requests.filter((req) => req.userEmail === user?.email);

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6 text-green-400">Employee Dashboard</h1>
      <p className="text-gray-300 mb-8">Submit leave requests and track your attendance.</p>
      {/* Attendance */}
      <div className="bg-white/10 p-6 rounded-lg mb-10 shadow-inner">
        <h2 className="text-xl font-semibold mb-5 text-green-300">Attendance</h2>
        <div className="flex gap-5 mb-5 flex-wrap">
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
            disabled={!attendance[emailKey]?.[today]?.clockIn || !!attendance[emailKey]?.[today]?.clockOut}
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
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded font-semibold text-white w-full transition"
        >
          Submit Request
        </button>
      </form>
      {/* Leave requests table */}
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
                  <tr key={req.id} className="border-b border-green-700 hover:bg-green-800 cursor-pointer transition">
                    <td className="py-3 px-6">{req.reason}</td>
                    <td className={`py-3 px-6 font-semibold ${
                      req.status === "Approved" ? "text-green-400"
                        : req.status === "Rejected" ? "text-red-400"
                        : "text-yellow-400"
                    }`}>{req.status}</td>
                    <td className="py-3 px-6">{req.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Attendance History Table */}
      <AttendanceHistory records={attnHistory} />
    </div>
  );
}
