import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import DashboardLayout from "./Pages/DashboardLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import HRDashboard from "./Pages/HRDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import ProfilePage from "./Components/ProfilePage";
import EmployeeChat from "./Components/EmployeeChat";
import ResetPassword from "./Components/ResetPassword";
import AdminAttendance from "./Components/AdminAttendance";
import AdminPayroll from "./Components/AdminPayroll";
import UserManagement from "./Components/UserManagement";
import AttendanceHistory from "./Components/AttendanceHistory";
import Login from "./Components/Login";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="payroll" element={<AdminPayroll />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* HR routes */}
        <Route
          path="/hr-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HRDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="chat" element={<EmployeeChat />} />
        </Route>

        {/* Employee routes */}
        <Route
          path="/employee-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="attendance" element={<AttendanceHistory />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="chat" element={<EmployeeChat />} />
        </Route>

        <Route
          path="*"
          element={
            user ? (
              <Navigate to={`/${role}-dashboard`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
