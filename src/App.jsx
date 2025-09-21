import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./Pages/DashboardLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import HRSummaryDashboard from "./Pages/HRSummaryDashboard"; // Updated HR dashboard import
import EmployeeDashboard from "./Pages/EmployeeDashboard";

import ProfilePage from "./Components/ProfilePage";
import ResetPassword from "./Components/ResetPassword";
import EmployeeChat from "./Components/EmployeeChat";
import EmployeeAttendance from "./Components/EmployeeAttendance";

import AdminAttendance from "./Components/AdminAttendance";
import AdminPayroll from "./Components/AdminPayroll";

import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />

        {/* Admin routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/attendance" element={<AdminAttendance />} />
          <Route path="/admin-dashboard/payroll" element={<AdminPayroll />} />
          <Route path="/admin-dashboard/profile" element={<ProfilePage />} />
          <Route path="/admin-dashboard/reset-password" element={<ResetPassword />} />
        </Route>

        {/* HR routes - updated */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/hr-dashboard" element={<HRSummaryDashboard />} />
          <Route path="/hr-dashboard/profile" element={<ProfilePage />} />
          <Route path="/hr-dashboard/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Employee routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee-dashboard/chat" element={<EmployeeChat />} />
          <Route path="/employee-dashboard/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee-dashboard/profile" element={<ProfilePage />} />
          <Route path="/employee-dashboard/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Default route */}
        <Route
          path="/"
          element={user ? <Navigate to={`/${role}-dashboard`} replace /> : <Navigate to="/login" replace />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
