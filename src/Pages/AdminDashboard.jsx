import React, { useState } from "react";
import { UserGroupIcon, ClipboardDocumentListIcon, ClockIcon } from "@heroicons/react/24/outline";
import EmployeeTable from "../Components/Employeetable";
import AddEmployee from "../Components/AddEmployee";
import dayjs from "dayjs";

const mockUsers = [
  { id: "1", name: "Alice Admin", email: "admin@gmail.com", role: "Admin", department: "Admin" },
  { id: "2", name: "Harry HR", email: "hr@gmail.com", role: "HR", department: "HR" },
  { id: "3", name: "Eve Employee", email: "employee@gmail.com", role: "Employee", department: "Development" },
];

const mockRequests = [
  { id: "r1", userEmail: "employee@gmail.com", reason: "Sick", status: "Pending" },
  { id: "r2", userEmail: "hr@gmail.com", reason: "Vacation", status: "Pending" },
];

export default function AdminDashboard() {
  const [modal, setModal] = useState(null);
  const [employees, setEmployees] = useState(mockUsers);
  const [requests, setRequests] = useState(mockRequests);

  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
  const today = dayjs().format("YYYY-MM-DD");

  let attendanceEntries = [];

  Object.entries(attendanceRecords).forEach(([userKey, dates]) => {
    Object.entries(dates).forEach(([date, record]) => {
      if (record.clockIn) {
        const user = employees.find(u => u.email.replace(/\./g, "_") === userKey);
        if (user) {
          attendanceEntries.push({
            id: user.id + date,
            name: user.name,
            email: user.email,
            role: user.role,
            date
          });
        }
      }
    });
  });

  attendanceEntries.sort((a, b) => b.date.localeCompare(a.date));

  const employeesCount = employees.filter(e => e.role === "Employee").length;
  const hrCount = employees.filter(e => e.role === "HR").length;
  const pendingCount = requests.filter(r => r.status === "Pending").length;
  const todayAttendanceCount = attendanceEntries.filter(entry => entry.date === today).length;

  const addEmployee = (newEmp) => {
    setEmployees(prev => [...prev, newEmp]);
    setModal("employees");
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const handleRequestAction = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const renderModalContent = () => {
    switch (modal) {
      case "employees":
        return <>
          <AddEmployee onAdd={addEmployee} />
          <EmployeeTable employees={employees.filter(e => e.role === "Employee")} onDelete={deleteEmployee} />
        </>;
      case "hrmembers":
        return <EmployeeTable employees={employees.filter(e => e.role === "HR")} onDelete={deleteEmployee} />;
      case "pending":
        return <RequestsTable requests={requests} onAction={handleRequestAction} />;
      case "attendance":
        return (
          <>
            <h2 className="text-green-400 font-bold mb-2">Attendance Records</h2>
            {attendanceEntries.length === 0 ? <p>No attendance records found</p> : (
              <table className="w-full text-left rounded border-collapse border border-green-600">
                <thead>
                  <tr className="bg-green-800 text-green-300">
                    <th className="p-2 border border-green-700">Name</th>
                    <th className="p-2 border border-green-700">Email</th>
                    <th className="p-2 border border-green-700">Role</th>
                    <th className="p-2 border border-green-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceEntries.map(a => (
                    <tr key={a.id} className="border border-green-700 hover:bg-green-700">
                      <td className="p-2 border border-green-700">{a.name}</td>
                      <td className="p-2 border border-green-700">{a.email}</td>
                      <td className="p-2 border border-green-700">{a.role}</td>
                      <td className="p-2 border border-green-700">{a.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8 text-green-400">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Employees" value={employeesCount} icon={UserGroupIcon} colorClass="text-green-400" onClick={() => setModal("employees")} />
        <StatCard label="HR Members" value={hrCount} icon={UserGroupIcon} colorClass="text-green-500" onClick={() => setModal("hrmembers")} />
        <StatCard label="Pending Requests" value={pendingCount} icon={ClipboardDocumentListIcon} colorClass="text-red-500" onClick={() => setModal("pending")} />
        <StatCard label="Today's Attendance" value={todayAttendanceCount} icon={ClockIcon} colorClass="text-yellow-400" onClick={() => setModal("attendance")} />
      </div>

      {modal && (
        <Modal title={modal.charAt(0).toUpperCase() + modal.slice(1)} onClose={() => setModal(null)}>
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, colorClass, onClick }) {
  return (
    <div onClick={onClick} className="bg-white/10 rounded p-6 text-center cursor-pointer shadow-md hover:bg-white/20 transition">
      <Icon className={`mx-auto mb-2 h-10 w-10 ${colorClass}`} />
      <h3 className="text-xl font-semibold text-green-300 mb-1">{label}</h3>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-auto p-4">
      <div className="relative max-w-4xl rounded bg-gray-900 p-6 shadow-lg w-full max-h-[80vh] overflow-auto">
        <h3 className="flex items-center text-green-400 text-xl font-semibold mb-4">
          {title}
          <button onClick={onClose} className="ml-auto text-red-500 font-bold text-2xl">×</button>
        </h3>
        {children}
      </div>
    </div>
  );
}

function RequestsTable({ requests, onAction }) {
  if (!requests.length) return <p>No leave requests found.</p>;

  return (
    <table className="w-full border-collapse border border-green-600 rounded text-green-300">
      <thead>
        <tr className="bg-green-800">
          <th className="p-2 border border-green-700">Employee</th>
          <th className="p-2 border border-green-700">Reason</th>
          <th className="p-2 border border-green-700">Status</th>
          <th className="p-2 border border-green-700 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(({ id, userEmail, reason, status }) => (
          <tr key={id} className="border border-green-700 hover:bg-green-700">
            <td className="p-2 border border-green-700">{userEmail}</td>
            <td className="p-2 border border-green-700">{reason}</td>
            <td className="p-2 border border-green-700">{status}</td>
            <td className="p-2 border border-green-700 text-center">
              {status === "Pending" ? (
                <>
                  <button onClick={() => onAction(id, "Approved")} className="bg-green-600 p-1 rounded mr-2">Accept</button>
                  <button onClick={() => onAction(id, "Rejected")} className="bg-red-600 p-1 rounded">Deny</button>
                </>
              ) : (
                status
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
