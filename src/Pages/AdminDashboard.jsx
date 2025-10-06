import React, { useEffect, useState } from "react";
import { UserGroupIcon, ClipboardDocumentListIcon, ClockIcon } from "@heroicons/react/24/outline";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer,
} from "recharts";

const mockUsers = [
  { id: "1", name: "Alice Admin", email: "admin@company.com", role: "Admin" },
  { id: "2", name: "John HR", email: "john.hr@company.com", role: "HR" },
  { id: "3", name: "Bob Dev", email: "bob@company.com", role: "Employee" },
];
const mockRequests = [
  { id: "r1", user: "bob@company.com", status: "Pending", reason: "Medical leave" },
  { id: "r2", user: "john.hr@company.com", status: "Pending", reason: "Family event" },
  { id: "r3", user: "bob@company.com", status: "Pending", reason: "Vacation" }
];
const mockAttendance = [
  { id: "a1", name: "Bob Dev", email: "bob@company.com", clockIn: "09:10", clockOut: "" },
  { id: "a2", name: "John HR", email: "john.hr@company.com", clockIn: "09:15", clockOut: "" },
  { id: "a3", name: "Alice Admin", email: "admin@company.com", clockIn: "08:57", clockOut: "17:10" }
];
const monthlyTrends = [
  { month: 'Jan', employees: 10, leaveRequests: 5 },
  { month: 'Feb', employees: 15, leaveRequests: 8 },
  { month: 'Mar', employees: 20, leaveRequests: 6 },
  { month: 'Apr', employees: 22, leaveRequests: 7 },
  { month: 'May', employees: 25, leaveRequests: 4 },
];

function DashboardCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white/10 p-6 rounded-lg shadow-md text-center hover:bg-white/20 transition-all cursor-pointer select-none flex-1 min-w-[200px]">
      <Icon className={`mx-auto h-10 w-10 mb-3 ${colorClass}`} />
      <h3 className="text-xl font-semibold mb-2 text-green-300">{title}</h3>
      <p className="text-4xl font-extrabold text-white">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => setEmployees(mockUsers), []);
  const hrCount = employees.filter((emp) => emp.role === "HR").length;
  const pendingRequests = mockRequests.length;
  const todayAttendanceCount = mockAttendance.length;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-green-400">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <DashboardCard title="Total Employees" value={employees.length} icon={UserGroupIcon} colorClass="text-green-400" />
        <DashboardCard title="HR Members" value={hrCount} icon={UserGroupIcon} colorClass="text-green-500" />
        <DashboardCard title="Pending Requests" value={pendingRequests} icon={ClipboardDocumentListIcon} colorClass="text-red-400" />
        <DashboardCard title="Today's Attendance" value={todayAttendanceCount} icon={ClockIcon} colorClass="text-yellow-400" />
      </div>
      <div className="bg-white/10 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Monthly Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyTrends} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#2f855a" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#68d391" />
            <YAxis stroke="#68d391" />
            <ChartTooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: 8 }} />
            <Line type="monotone" dataKey="employees" stroke="#48bb78" strokeWidth={3} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="leaveRequests" stroke="#f56565" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
