// src/Pages/EmployeeDashboard.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { db } from "../firebaseConfig"; // ✅ Correct path to db
import { push, ref, onValue } from "firebase/database"; // ✅ Firebase DB methods
import dayjs from "dayjs";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const emailKey = user?.email.replace(/\./g, "_");

  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);
  const [attendance, setAttendance] = useState({});
  const today = dayjs().format("YYYY-MM-DD");

  // Load existing leave requests for this user
  useEffect(() => {
    const leaveRef = ref(db, "leaveRequests");
    onValue(leaveRef, (snapshot) => {
      const data = snapshot.val() || {};
      const myRequests = Object.entries(data)
        .filter(([_, req]) => req.userEmail === user?.email)
        .map(([id, req]) => ({ id, ...req }))
        .reverse();
      setRequests(myRequests);
    });

    const attendanceRef = ref(db, `attendance/${emailKey}`);
    onValue(attendanceRef, (snapshot) => {
      setAttendance(snapshot.val() || {});
    });
  }, [emailKey, user?.email]);

  // Submit leave request
  const submitRequest = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    const leaveRef = ref(db, "leaveRequests");
    push(leaveRef, {
      userEmail: user?.email,
      reason,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
    setReason("");
  };

  // Handle clock-in / clock-out
  const clockIn = () => {
    const todayRef = ref(db, `attendance/${emailKey}/${today}`);
    const now = dayjs().format("HH:mm:ss");
    push(todayRef, { clockIn: now });
  };

  const clockOut = () => {
    const todayRef = ref(db, `attendance/${emailKey}/${today}`);
    const now = dayjs().format("HH:mm:ss");
    push(todayRef, { clockOut: now });
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Employee Dashboard</h1>
      <p className="text-gray-300 mb-6">
        Welcome {user?.email}! Submit leave requests or mark attendance.
      </p>

      {/* Attendance Section */}
      <div className="bg-white/10 p-6 rounded-lg mb-8 flex gap-4">
        <button
          onClick={clockIn}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
        >
          Clock In
        </button>
        <button
          onClick={clockOut}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
        >
          Clock Out
        </button>
      </div>

      {/* Leave Request Form */}
      <form onSubmit={submitRequest} className="bg-white/10 p-6 rounded-lg mb-8">
        <label className="block mb-2 text-sm">Reason for leave</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Sick leave, personal work..."
          className="w-full px-4 py-2 mb-4 rounded bg-white/10 border border-white/30 text-white"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold"
        >
          Submit Request
        </button>
      </form>

      {/* Leave Requests List */}
      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Leave Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-400">No requests submitted yet.</p>
        ) : (
          <ul className="space-y-2">
            {requests.map((req) => (
              <li key={req.id} className="flex justify-between border-b border-white/20 py-2">
                <span>{req.reason}</span>
                <span className="text-sm text-gray-300">{req.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}
