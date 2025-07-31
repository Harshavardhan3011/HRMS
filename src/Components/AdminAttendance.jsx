// src/Components/AdminAttendance.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import dayjs from "dayjs";

export default function AdminAttendance() {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const attendanceRef = ref(db, "attendance");
    onValue(attendanceRef, (snapshot) => {
      setAttendanceData(snapshot.val() || {});
    });
  }, []);

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="bg-white/10 p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Today's Attendance</h2>
      {Object.keys(attendanceData).length === 0 ? (
        <p className="text-gray-400">No attendance records today.</p>
      ) : (
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2">Employee</th>
              <th className="py-2">Clock In</th>
              <th className="py-2">Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(attendanceData).map(([emailKey, dates]) => {
              const todayRecord = dates[today];
              if (!todayRecord) return null;

              const employeeEmail = emailKey.replace(/_/g, ".");
              return (
                <tr key={emailKey} className="border-b border-gray-700 hover:bg-white/5">
                  <td className="py-2">{employeeEmail}</td>
                  <td className="py-2">{todayRecord.clockIn || "N/A"}</td>
                  <td className="py-2">{todayRecord.clockOut || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
