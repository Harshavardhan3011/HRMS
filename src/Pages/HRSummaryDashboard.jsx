import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function HRSummaryDashboard() {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [openJobs, setOpenJobs] = useState(3); // Example, replace with actual state
  const [applicants, setApplicants] = useState(12); // Example, replace with actual state
  const [avgTimeToHire, setAvgTimeToHire] = useState(45); // Example

  useEffect(() => {
    // Simulate fetching real-time data from localStorage
    setEmployees(JSON.parse(localStorage.getItem("employees")) || [
      { id: "1", name: "Alice", department: "Sales", location: "NY", performance: "Good", email: "alice@example.com" },
      { id: "2", name: "Bob", department: "Engineering", location: "NY", performance: "Needs Improvement", email: "bob@example.com" },
      { id: "3", name: "Carol", department: "Engineering", location: "LA", performance: "Good", email: "carol@example.com" },
      { id: "4", name: "Dan", department: "Sales", location: "LA", performance: "Good", email: "dan@example.com" },
    ]);
    setAttendanceRecords(JSON.parse(localStorage.getItem("attendanceRecords")) || {});
    setLeaveRequests(JSON.parse(localStorage.getItem("leaveRequests")) || [
      { id: "lr1", userEmail: "alice@example.com", status: "Pending", type: "Sick" },
      { id: "lr2", userEmail: "bob@example.com", status: "Approved", type: "Casual" },
    ]);
    // Add similar updates for jobs and applicants from actual storage APIs if built
  }, []);

  const today = dayjs().format("YYYY-MM-DD");

  // Attendance
  const presentKeys = Object.entries(attendanceRecords)
    .filter(([_, dates]) => dates[today]?.clockIn)
    .map(([userKey]) => userKey);

  const presentEmployees = employees.filter(e => presentKeys.includes(e.email.replace(/\./g, "_")));
  const absentEmployees = employees.filter(e => !presentKeys.includes(e.email.replace(/\./g, "_")));

  // Leave
  const totalLeavesTaken = leaveRequests.filter(r => r.status === "Approved").length;
  const pendingLeaveRequests = leaveRequests.filter(r => r.status === "Pending").length;

  // Counts for summary
  const departmentCounts = employees.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});
  const locationCounts = employees.reduce((acc, curr) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {});
  const performanceCounts = employees.reduce((acc, curr) => {
    acc[curr.performance] = (acc[curr.performance] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen text-green-300 px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">HR Summary Dashboard</h1>

      {/* Employee Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">All Employees</h2>
        <table className="w-full border border-green-700 rounded bg-gray-800">
          <thead>
            <tr className="bg-green-900 text-green-300">
              <th className="p-3 border border-green-700">Name</th>
              <th className="p-3 border border-green-700">Department</th>
              <th className="p-3 border border-green-700">Location</th>
              <th className="p-3 border border-green-700">Performance</th>
              <th className="p-3 border border-green-700">Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id} className="hover:bg-green-950">
                <td className="p-3 border border-green-700">{e.name}</td>
                <td className="p-3 border border-green-700">{e.department}</td>
                <td className="p-3 border border-green-700">{e.location}</td>
                <td className="p-3 border border-green-700">{e.performance}</td>
                <td className="p-3 border border-green-700">{e.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Department and Location Table */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Employees by Department</h3>
          <table className="w-full border border-green-700 rounded bg-gray-800">
            <thead>
              <tr>
                <th className="p-2 border border-green-700">Department</th>
                <th className="p-2 border border-green-700">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(departmentCounts).map(([dept, count]) => (
                <tr key={dept}>
                  <td className="p-2 border border-green-700">{dept}</td>
                  <td className="p-2 border border-green-700">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Employees by Location</h3>
          <table className="w-full border border-green-700 rounded bg-gray-800">
            <thead>
              <tr>
                <th className="p-2 border border-green-700">Location</th>
                <th className="p-2 border border-green-700">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(locationCounts).map(([loc, count]) => (
                <tr key={loc}>
                  <td className="p-2 border border-green-700">{loc}</td>
                  <td className="p-2 border border-green-700">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recruitment Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Hiring & Recruitment</h2>
        <table className="w-full border border-green-700 rounded bg-gray-800">
          <thead>
            <tr>
              <th className="p-2 border border-green-700">Open Jobs</th>
              <th className="p-2 border border-green-700">Applicants</th>
              <th className="p-2 border border-green-700">Avg. Time to Hire (days)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-green-700">{openJobs}</td>
              <td className="p-2 border border-green-700">{applicants}</td>
              <td className="p-2 border border-green-700">{avgTimeToHire}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Attendance Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Attendance - Today ({today})</h2>
        <table className="w-full border border-green-700 rounded bg-gray-800">
          <thead>
            <tr>
              <th className="p-2 border border-green-700">Status</th>
              <th className="p-2 border border-green-700">Name</th>
              <th className="p-2 border border-green-700">Department</th>
              <th className="p-2 border border-green-700">Location</th>
            </tr>
          </thead>
          <tbody>
            {presentEmployees.map(e => (
              <tr key={e.id} className="bg-green-950">
                <td className="p-2 border border-green-700">Present</td>
                <td className="p-2 border border-green-700">{e.name}</td>
                <td className="p-2 border border-green-700">{e.department}</td>
                <td className="p-2 border border-green-700">{e.location}</td>
              </tr>
            ))}
            {absentEmployees.map(e => (
              <tr key={e.id} className="bg-gray-900">
                <td className="p-2 border border-green-700">Absent</td>
                <td className="p-2 border border-green-700">{e.name}</td>
                <td className="p-2 border border-green-700">{e.department}</td>
                <td className="p-2 border border-green-700">{e.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave and Performance Table */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Leaves Summary</h3>
          <table className="w-full border border-green-700 rounded bg-gray-800">
            <thead>
              <tr>
                <th className="p-2 border border-green-700">Total Leaves Taken</th>
                <th className="p-2 border border-green-700">Pending Leave Requests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-green-700">{totalLeavesTaken}</td>
                <td className="p-2 border border-green-700">{pendingLeaveRequests}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Performance Summary</h3>
          <table className="w-full border border-green-700 rounded bg-gray-800">
            <thead>
              <tr>
                <th className="p-2 border border-green-700">Performance</th>
                <th className="p-2 border border-green-700">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(performanceCounts).map(([perf, count]) => (
                <tr key={perf}>
                  <td className="p-2 border border-green-700">{perf}</td>
                  <td className="p-2 border border-green-700">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
