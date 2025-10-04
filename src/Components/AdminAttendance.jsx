import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function AdminAttendance() {
  const [attendanceData, setAttendanceData] = useState({});
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    // Fetch attendance data from an API or local source
    async function fetchAttendance() {
      try {
        const response = await fetch("/api/attendance"); // Change to your endpoint or data source
        const data = await response.json();
        setAttendanceData(data || {});
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceData({});
      }
    }
    fetchAttendance();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl mt-10 shadow-lg max-w-6xl mx-auto">
      <h2 className="text-3xl text-green-400 font-extrabold mb-6 border-b border-green-600 pb-2">
        Today's Attendance
      </h2>
      {Object.keys(attendanceData).length === 0 ? (
        <p className="text-gray-400 text-xl italic text-center py-10">
          No attendance records for today.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-gray-300">
            <thead>
              <tr className="bg-green-900 text-green-300 uppercase tracking-wide">
                <th className="py-3 px-6 rounded-tl-lg">Employee</th>
                <th className="py-3 px-6">Clock In</th>
                <th className="py-3 px-6 rounded-tr-lg">Clock Out</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceData).map(([emailKey, dates]) => {
                const todayRecord = dates[today];
                if (!todayRecord) return null;

                const employeeEmail = emailKey.replace(/_/g, ".");

                return (
                  <tr
                    key={emailKey}
                    className="border-b border-green-700 hover:bg-green-800 cursor-pointer transition duration-200"
                  >
                    <td className="py-4 px-6 font-medium">{employeeEmail}</td>
                    <td className="py-4 px-6">{todayRecord.clockIn || "N/A"}</td>
                    <td className="py-4 px-6">{todayRecord.clockOut || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
