import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const mockUsers = [
  { id: "1", name: "Alice Admin", email: "admin@gmail.com", role: "Admin", department: "Admin" },
  { id: "2", name: "Harry HR", email: "hr@gmail.com", role: "HR", department: "HR" },
  { id: "3", name: "Eve Employee", email: "employee@gmail.com", role: "Employee", department: "Development" },
];

const mockRequests = [
  { id: "r1", userEmail: "employee@gmail.com", reason: "Sick", status: "Pending" },
  { id: "r2", userEmail: "hr@gmail.com", reason: "Vacation", status: "Pending" },
];

export default function HRDashboard() {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : {};
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("leaveRequests");
    return saved ? JSON.parse(saved) : mockRequests;
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const emailKey = user?.email.replace(/\./g, "_");
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(requests));
  }, [requests]);

  // Clock In/Out Handlers
  const saveAttendance = (clockIn = null, clockOut = null) => {
    setAttendance(prev => {
      const userRecords = prev[emailKey] || {};
      const todayRecord = userRecords[today] || {};
      const updatedRecord = {
        ...todayRecord,
        clockIn: clockIn || todayRecord.clockIn,
        clockOut: clockOut || todayRecord.clockOut,
      };
      return { ...prev, [emailKey]: { ...userRecords, [today]: updatedRecord } };
    });
  };

  const handleClockIn = () => {
    if (attendance[emailKey]?.[today]?.clockIn) {
      alert("Already clocked in today.");
      return;
    }
    saveAttendance(dayjs().format("HH:mm:ss"), null);
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
    saveAttendance(null, dayjs().format("HH:mm:ss"));
  };

  // Filter attendance for HR & Admin only
  const attendeesKeys = Object.entries(attendance)
    .filter(([userKey, records]) => {
      const user = mockUsers.find(u => u.email.replace(/\./g,"_") === userKey);
      return records[today]?.clockIn && user && (user.role === "Admin" || user.role === "HR");
    })
    .map(([userKey]) => userKey);

  const attendees = mockUsers.filter(u => attendeesKeys.includes(u.email.replace(/\./g, "_")));

  // Leave request helpers (you can implement approve/deny if needed)
  const pendingRequests = requests.filter(r => r.status === "Pending");
  const totalEmployees = mockUsers.filter(u => u.role === "Employee").length;

  return (
    <div className="p-6 bg-gradient-to-br from-[#060110] via-[#0b0515] to-[#f40606] text-green-300 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8">HR Dashboard</h2>

      <section className="mb-8 bg-white/10 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Attendance</h3>
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleClockIn}
            disabled={!!attendance[emailKey]?.[today]?.clockIn}
            className="rounded px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 transition"
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            disabled={!attendance[emailKey]?.[today]?.clockIn || !!attendance[emailKey]?.[today]?.clockOut}
            className="rounded px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 transition"
          >
            Clock Out
          </button>
        </div>

        <h4 className="font-semibold mb-2">Today's HR & Admin Attendance</h4>
        {attendees.length === 0 ? (
          <p>No attendance recorded today.</p>
        ) : (
          <table className="w-full text-left bg-gray-800 rounded overflow-hidden text-green-300">
            <thead className="bg-green-900 text-green-400">
              <tr>
                <th className="py-2 px-4 border border-green-700">Name</th>
                <th className="py-2 px-4 border border-green-700">Email</th>
                <th className="py-2 px-4 border border-green-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map(u => (
                <tr key={u.id} className="hover:bg-green-900">
                  <td className="p-2 border border-green-700">{u.name}</td>
                  <td className="p-2 border border-green-700">{u.email}</td>
                  <td className="p-2 border border-green-700">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="bg-white/10 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Pending Leave Requests</h3>
        {pendingRequests.length === 0 ? (
          <p>No pending leave requests.</p>
        ) : (
          <table className="w-full text-left bg-gray-800 rounded overflow-hidden text-green-300">
            <thead className="bg-green-900 text-green-400">
              <tr>
                <th className="py-2 px-4 border border-green-700">Employee Email</th>
                <th className="py-2 px-4 border border-green-700">Reason</th>
                <th className="py-2 px-4 border border-green-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map(({ id, userEmail, reason, status }) => (
                <tr key={id} className="hover:bg-green-900">
                  <td className="p-2 border border-green-700">{userEmail}</td>
                  <td className="p-2 border border-green-700">{reason}</td>
                  <td className="p-2 border border-green-700">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="bg-white/10 p-6 rounded shadow mt-8">
        <h3 className="text-2xl font-semibold">Total Employees</h3>
        <p>{totalEmployees}</p>
      </section>
    </div>
  );
}
