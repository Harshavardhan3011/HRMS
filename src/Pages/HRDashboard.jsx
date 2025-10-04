// HRDashboard.jsx
import React from "react";
import DashboardLayout from "./DashboardLayout";
import EmployeeTable from "../Components/Employeetable";

export default function HRDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-extrabold mb-6 text-green-400">HR Dashboard</h1>
      <p className="text-green-300">
        HR team tools like employee list and requests.
      </p>
      <EmployeeTable />
      {/* HR specific components */}
    </DashboardLayout>
  );
}
