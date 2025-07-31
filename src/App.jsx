import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import HRDashboard from "./Pages/HRDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import ForgotPassword from './Components/ForgotPassword';
import ProfilePage from './Components/ProfilePage';
import EmployeeChat from './Components/EmployeeChat';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/chat"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "HR", "employee"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
