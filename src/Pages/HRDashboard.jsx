import React from "react";
import DashboardLayout from "./DashboardLayout";
import EmployeeTable from "../Components/Employeetable";

export default function HRDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">HR Dashboard</h1>
      <p className="text-gray-300 mb-6">Here’s a list of all employees.</p>
      <EmployeeTable />
    </DashboardLayout>
  );
}
