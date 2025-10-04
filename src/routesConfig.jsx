import AdminDashboard from "./Pages/AdminDashboard";
import AdminAttendance from "./Components/AdminAttendance";
import AdminPayroll from "./Components/AdminPayroll";
import HRDashboard from "./Pages/HRDashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import EmployeeChat from "./Components/EmployeeChat";
import ProfilePage from "./Components/ProfilePage";
import ResetPassword from "./Components/ResetPassword";

export const routes = [
  {
    path: "/admin-dashboard",
    label: "Dashboard",
    component: AdminDashboard,
    roles: ["admin"],
  },
  {
    path: "/admin-dashboard/attendance",
    label: "Attendance",
    component: AdminAttendance,
    roles: ["admin"],
  },
  {
    path: "/admin-dashboard/payroll",
    label: "Payroll",
    component: AdminPayroll,
    roles: ["admin"],
  },
  {
    path: "/hr-dashboard",
    label: "Dashboard",
    component: HRDashboard,
    roles: ["hr"],
  },
  {
    path: "/employee-dashboard",
    label: "Dashboard",
    component: EmployeeDashboard,
    roles: ["employee"],
  },
  {
    path: "/employee-dashboard/chat",
    label: "Chat",
    component: EmployeeChat,
    roles: ["employee"],
  },
  {
    path: "/admin-dashboard/profile",
    label: "My Profile",
    component: ProfilePage,
    roles: ["admin", "hr", "employee"],
  },
  {
    path: "/admin-dashboard/reset-password",
    label: "Reset Password",
    component: ResetPassword,
    roles: ["admin", "hr", "employee"],
  },
];
