import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function EmployeeAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const today = dayjs().format("YYYY-MM-DD");
  const [attendance, setAttendance] = useState(null);
  const emailKey = user?.email?.replace(/\./g, "_");

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const res = await fetch(`/api/attendance/${emailKey}/${today}`);
        if (res.ok) {
          const data = await res.json();
          setAttendance(data || null);
        } else {
          setAttendance(null);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendance(null);
      }
    }
    if (emailKey && today) {
      fetchAttendance();
    }
  }, [emailKey, today]);

  const handleClockIn = async () => {
    if (attendance?.clockIn) {
      alert("You have already clocked in today.");
      return;
    }
    try {
      const clockInTime = dayjs().format("HH:mm:ss");
      const res = await fetch(`/api/attendance/${emailKey}/${today}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clockIn: clockInTime, clockOut: "" }),
      });
      if (res.ok) {
        setAttendance({ clockIn: clockInTime, clockOut: "" });
      } else {
        alert("Error recording clock in.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleClockOut = async () => {
    if (!attendance?.clockIn) {
      alert("You must clock in first.");
      return;
    }
    if (attendance?.clockOut) {
      alert("You have already clocked out today.");
      return;
    }
    try {
      const clockOutTime = dayjs().format("HH:mm:ss");
      const res = await fetch(`/api/attendance/${emailKey}/${today}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clockOut: clockOutTime }),
      });
      if (res.ok) {
        setAttendance((prev) => ({ ...prev, clockOut: clockOutTime }));
      } else {
        alert("Error recording clock out.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl mt-10 shadow-lg max-w-md mx-auto text-white">
      <h2 className="text-3xl font-extrabold mb-6 border-b border-green-600 pb-2">Attendance</h2>
      <p className="text-green-400 mb-6 text-lg font-semibold">Date: {today}</p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleClockIn}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition duration-150"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition duration-150"
        >
          Clock Out
        </button>
      </div>

      {attendance ? (
        <div className="space-y-2 text-green-300 text-lg font-medium">
          <p>
            Clock In: <span className="font-semibold">{attendance.clockIn || "Not yet"}</span>
          </p>
          <p>
            Clock Out: <span className="font-semibold">{attendance.clockOut || "Not yet"}</span>
          </p>
        </div>
      ) : (
        <p className="italic text-gray-400">You have not clocked in yet today.</p>
      )}
    </div>
  );
}
