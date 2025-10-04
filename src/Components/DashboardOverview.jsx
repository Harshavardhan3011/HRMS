import React from "react";
import { DashboardCard } from "./DashboardCard";
import OverviewCharts from "./OverviewCharts";
import { UserGroupIcon, ClipboardCheckIcon, ClockIcon } from "@heroicons/react/outline";

export default function DashboardOverview({ employeeCount, hrCount, pendingRequests, todayAttendanceCount }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <DashboardCard
          title="Total Employees"
          value={employeeCount}
          icon={UserGroupIcon}
          colorClass="text-green-400"
          tooltipText="Total number of employees in your organization"
        />
        <DashboardCard
          title="HR Members"
          value={hrCount}
          icon={UserGroupIcon}
          colorClass="text-green-500"
          tooltipText="Number of HR department employees"
        />
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests}
          icon={ClipboardCheckIcon}
          colorClass="text-red-400"
          tooltipText="Number of leave requests pending approval"
        />
        <DashboardCard
          title="Today’s Attendance"
          value={todayAttendanceCount}
          icon={ClockIcon}
          colorClass="text-yellow-400"
          tooltipText="Number of employees who clocked in today"
        />
      </div>

      <div className="bg-white/10 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Monthly Trends</h2>
        <OverviewCharts />
      </div>
    </div>
  );
}
