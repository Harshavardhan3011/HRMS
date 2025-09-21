import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function AdminAttendance() {
  const [attendanceData, setAttendanceData] = useState({});
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const records = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    setAttendanceData(records);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-green-400">Today's Attendance</h2>
      <table className="w-full text-left border border-green-600 rounded text-green-300">
        <thead className="bg-green-800 text-green-400">
          <tr>
            <th className="py-3 px-4 border border-green-600">User</th>
            <th className="py-3 px-4 border border-green-600">Clock In</th>
            <th className="py-3 px-4 border border-green-600">Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(attendanceData).map(([userKey, dates]) => {
            const att = dates[today];
            if (!att) return null;
            return (
              <tr key={userKey} className="border border-green-700 hover:bg-green-800">
                <td className="py-2 px-4 border border-green-600">{userKey.replace(/_/g, "@")}</td>
                <td className="py-2 px-4 border border-green-600">{att.clockIn || "-"}</td>
                <td className="py-2 px-4 border border-green-600">{att.clockOut || "-"}</td>
              </tr>
            );
          })}
          {Object.keys(attendanceData).length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-green-400">
                No attendance records for today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
