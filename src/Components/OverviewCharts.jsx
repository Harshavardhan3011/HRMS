import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', employees: 10, leaveRequests: 5 },
  { month: 'Feb', employees: 15, leaveRequests: 8 },
  { month: 'Mar', employees: 20, leaveRequests: 6 },
  { month: 'Apr', employees: 22, leaveRequests: 7 },
  { month: 'May', employees: 25, leaveRequests: 4 },
];

export default function OverviewCharts() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#2f855a" strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#68d391" />
        <YAxis stroke="#68d391" />
        <ChartTooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: 8 }} />
        <Line type="monotone" dataKey="employees" stroke="#48bb78" strokeWidth={3} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="leaveRequests" stroke="#f56565" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
