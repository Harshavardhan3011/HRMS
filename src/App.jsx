import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./Pages/DashboardLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import ProfilePage from "./Components/ProfilePage";
import EmployeeChat from "./Components/EmployeeChat";
import ResetPassword from "./Components/ResetPassword";
import AdminAttendance from "./Components/AdminAttendance";
import AdminPayroll from "./Components/AdminPayroll";
import Login from "./Components/Login";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path={`/${role}-dashboard`} element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="payroll" element={<AdminPayroll />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chat" element={<EmployeeChat />} />
          <Route path="reset-password" element={<ResetPassword />} />
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
