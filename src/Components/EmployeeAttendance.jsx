import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function EmployeeAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : {};
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const emailKey = user?.email?.replace(/\./g, "_");
  const today = dayjs().format("YYYY-MM-DD");

  const todayRecord = attendanceRecords[emailKey]?.[today] || { clockIn: null, clockOut: null };

  const saveRecords = (updatedRecords) => {
    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendanceRecords", JSON.stringify(updatedRecords));
  };

  const handleClockIn = () => {
    if (todayRecord.clockIn) {
      alert("Already clocked in today.");
      return;
    }
    const time = dayjs().format("HH:mm:ss");
    const updated = {
      ...attendanceRecords,
      [emailKey]: {
        ...attendanceRecords[emailKey],
        [today]: { ...todayRecord, clockIn: time },
      },
    };
    saveRecords(updated);
  };

  const handleClockOut = () => {
    if (!todayRecord.clockIn) {
      alert("You must clock in first.");
      return;
    }
    if (todayRecord.clockOut) {
      alert("Already clocked out today.");
      return;
    }
    const time = dayjs().format("HH:mm:ss");
    const updated = {
      ...attendanceRecords,
      [emailKey]: {
        ...attendanceRecords[emailKey],
        [today]: { ...todayRecord, clockOut: time },
      },
    };
    saveRecords(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-green-300">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <p>Date: {today}</p>
      <div className="flex gap-4 my-4">
        <button
          onClick={handleClockIn}
          disabled={!!todayRecord.clockIn}
          className={`px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:bg-gray-600`}
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={!todayRecord.clockIn || !!todayRecord.clockOut}
          className={`px-4 py-2 rounded bg-red-600 hover:bg-red-700 disabled:bg-gray-600`}
        >
          Clock Out
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Today's Attendance</h3>
        <p>Clock In: <strong>{todayRecord.clockIn || "Not clocked in"}</strong></p>
        <p>Clock Out: <strong>{todayRecord.clockOut || "Not clocked out"}</strong></p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">All Attendance Records</h3>
        <table className="w-full text-left border border-green-400 rounded">
          <thead>
            <tr className="bg-green-700">
              <th className="px-4 py-2 border border-green-600">Date</th>
              <th className="px-4 py-2 border border-green-600">Clock In</th>
              <th className="px-4 py-2 border border-green-600">Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords[emailKey]
              ? Object.entries(attendanceRecords[emailKey])
                  .sort(([a], [b]) => (a < b ? 1 : -1)) // descending by date
                  .map(([date, record]) => (
                    <tr key={date} className="hover:bg-green-800">
                      <td className="border border-green-600 px-4 py-1">{date}</td>
                      <td className="border border-green-600 px-4 py-1">{record.clockIn || "-"}</td>
                      <td className="border border-green-600 px-4 py-1">{record.clockOut || "-"}</td>
                    </tr>
                  ))
              : (
                <tr><td colSpan="3" className="text-center p-4">No attendance records found.</td></tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
