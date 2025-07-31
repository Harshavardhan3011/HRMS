// src/Pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import EmployeeTable from "../Components/Employeetable";
import EmployeeForm from "../Components/EmployeeForm";
import RequestManager from "../Components/RequestManager";
import { db } from "../firebaseConfig";
import { ref, onValue, push } from "firebase/database";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [employeeCount, setEmployeeCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  // Fetch counts dynamically
  useEffect(() => {
    // Count employees
    const employeesRef = ref(db, "employees");
    onValue(employeesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setEmployeeCount(Object.keys(data).length);
    });

    // Count pending requests
    const requestsRef = ref(db, "leaveRequests");
    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const pending = Object.values(data).filter(
        (req) => req.status === "Pending"
      ).length;
      setPendingRequests(pending);
    });
  }, []);

  // Handle adding employee to Firebase
  const handleAddEmployee = (employee) => {
    push(ref(db, "employees"), employee)
      .then(() => alert("Employee added successfully!"))
      .catch((err) => alert("Error adding employee: " + err.message));
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-8">
        {["dashboard", "employees", "requests"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {tab === "dashboard"
              ? "Overview"
              : tab === "employees"
              ? "Manage Employees"
              : "Manage Requests"}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Total Employees" value={employeeCount} />
          <DashboardCard title="HR Members" value="3" />
          <DashboardCard title="Pending Requests" value={pendingRequests} />
        </div>
      )}

      {/* Employee Management */}
      {activeTab === "employees" && (
        <div className="space-y-6">
          <EmployeeTable />
          <EmployeeForm onSubmit={handleAddEmployee} />
        </div>
      )}

      {/* Leave Requests */}
      {activeTab === "requests" && <RequestManager />}
    </DashboardLayout>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white/10 p-6 rounded-lg shadow text-center hover:bg-white/20 transition">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
