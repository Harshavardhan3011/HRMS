import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function EmployeeDashboard() {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : {};
  });
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("leaveRequests");
    return saved ? JSON.parse(saved) : [];
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const today = dayjs().format("YYYY-MM-DD");
  const emailKey = user?.email.replace(/\./g, "_");

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(requests));
  }, [requests]);

  const saveAttendance = (clockIn = null, clockOut = null) => {
    setAttendance((prev) => {
      const userRecords = prev[emailKey] || {};
      const todayRecord = userRecords[today] || {};
      const updatedRecord = {
        ...todayRecord,
        clockIn: clockIn || todayRecord.clockIn,
        clockOut: clockOut || todayRecord.clockOut,
      };
      return {
        ...prev,
        [emailKey]: { ...userRecords, [today]: updatedRecord },
      };
    });
  };

  const handleClockIn = () => {
    const todayRecord = attendance[emailKey]?.[today];
    if (todayRecord?.clockIn) {
      alert("Already clocked in today.");
      return;
    }
    saveAttendance(dayjs().format("HH:mm:ss"), null);
  };

  const handleClockOut = () => {
    const todayRecord = attendance[emailKey]?.[today];
    if (!todayRecord?.clockIn) {
      alert("You must clock in first.");
      return;
    }
    if (todayRecord.clockOut) {
      alert("Already clocked out today.");
      return;
    }
    saveAttendance(null, dayjs().format("HH:mm:ss"));
  };

  const submitRequest = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Please enter a reason for leave.");
      return;
    }
    const newRequest = {
      id: Date.now().toString(),
      userEmail: user?.email || "Unknown",
      reason,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [newRequest, ...prev]);
    setReason("");
    alert("Leave request submitted.");
  };

  const userRequests = requests.filter((req) => req.userEmail === user.email);

  return (
    <>
      <h1 className="text-3xl mb-6 text-green-400 font-extrabold">Employee Dashboard</h1>

      <div className="bg-white/10 rounded p-6 mb-8 max-w-md">
        <h2 className="font-semibold text-green-300 mb-3 text-lg">Attendance</h2>
        <div className="flex gap-4 mb-3">
          <button
            onClick={handleClockIn}
            disabled={!!attendance[emailKey]?.[today]?.clockIn}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:bg-gray-600"
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            disabled={
              !attendance[emailKey]?.[today]?.clockIn || !!attendance[emailKey]?.[today]?.clockOut
            }
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
          >
            Clock Out
          </button>
        </div>
        <p>
          Clock In: <strong>{attendance[emailKey]?.[today]?.clockIn || "-"}</strong> | Clock Out:{" "}
          <strong>{attendance[emailKey]?.[today]?.clockOut || "-"}</strong>
        </p>
      </div>

      {/* Leave Requests Form and Table */}
      <form onSubmit={submitRequest} className="max-w-md bg-white/10 p-6 rounded mb-8 space-y-4 text-green-300">
        <label className="block font-semibold">Reason for leave:</label>
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-900 text-green-300 border border-green-600"
          placeholder="Reason (e.g. sick leave)"
        />
        <button
          type="submit"
          className="bg-indigo-600 py-2 rounded hover:bg-indigo-700 font-semibold w-full"
        >
          Submit Leave Request
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3 text-green-400">My Leave Requests</h2>
      <ul className="max-w-md space-y-2 text-green-300">
        {userRequests.length === 0 ? (
          <p>No leave requests submitted</p>
        ) : (
          userRequests.map(({ id, reason, status }) => (
            <li key={id} className="border p-2 rounded bg-gray-800">
              {reason} - <span className="font-semibold">{status}</span>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
