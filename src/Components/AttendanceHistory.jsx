import React from "react";

export default function AttendanceHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const emailKey = user?.email?.replace(/\./g, "_");
  const attendanceObj = JSON.parse(localStorage.getItem("attendance") ?? "{}");
  const recordsObj = attendanceObj[emailKey] ?? {};
  const records = Object.entries(recordsObj).map(([date, entry]) => ({
    date,
    clockIn: entry.clockIn,
    clockOut: entry.clockOut,
  }));

  return (
    <div className="bg-white/10 p-6 rounded-lg shadow mt-8 max-w-3xl mx-auto overflow-x-auto">
      <h2 className="text-xl text-green-300 font-bold mb-4">Attendance History</h2>
      <table className="w-full text-green-200">
        <thead>
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Clock In</th>
            <th className="py-2">Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-gray-400 py-5">No records available.</td>
            </tr>
          ) : (
            records.map(r => (
              <tr key={r.date}>
                <td className="py-2">{r.date}</td>
                <td className="py-2">{r.clockIn || "Not yet"}</td>
                <td className="py-2">{r.clockOut || "Not yet"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
