// src/Pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Pages/DashboardLayout";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get logged in user
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];

    if (loggedUser) {
      const fullUser = allUsers.find((u) => u.email === loggedUser.email);
      if (fullUser) {
        setUser(fullUser);
        setName(fullUser.name || "");
        setEmail(fullUser.email);
        setRole(fullUser.role);
      }

      // Filter this user's leave requests
      const myRequests = allRequests.filter(
        (req) => req.email === loggedUser.email
      );
      setRequests(myRequests);
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, name } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Update local logged-in user info
    localStorage.setItem("user", JSON.stringify({ email, role }));
    setMessage("✅ Profile updated successfully!");
  };

  if (!user) return <DashboardLayout><p>Loading profile...</p></DashboardLayout>;

  // Stats
  const totalRequests = requests.length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const rejected = requests.filter((r) => r.status === "Rejected").length;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">My Profile & Dashboard</h1>

      {message && <p className="text-green-400 mb-4">{message}</p>}

      {/* Profile Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <form
          onSubmit={handleUpdate}
          className="space-y-4 bg-white/10 p-6 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">Profile Information</h2>

          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
              value={email}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
              value={role}
              disabled
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            Update Profile
          </button>

          <div className="text-right mt-2">
            <a
              href="/reset-password"
              className="text-indigo-400 hover:underline"
            >
              Change Password
            </a>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">My Leave Stats</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded">
              <p className="text-lg font-bold">{totalRequests}</p>
              <p className="text-gray-300 text-sm">Total Requests</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-lg font-bold">{pending}</p>
              <p className="text-gray-300 text-sm">Pending</p>
            </div>
            <div className="bg-green-600/50 p-4 rounded">
              <p className="text-lg font-bold">{approved}</p>
              <p className="text-gray-100 text-sm">Approved</p>
            </div>
            <div className="bg-red-600/50 p-4 rounded">
              <p className="text-lg font-bold">{rejected}</p>
              <p className="text-gray-100 text-sm">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white/10 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Leave Requests</h2>
        {requests.length === 0 ? (
          <p className="text-gray-400">No leave requests submitted yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2">Reason</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-gray-700 hover:bg-white/5">
                  <td className="py-2">{req.reason}</td>
                  <td className="py-2">{req.status}</td>
                  <td className="py-2">
                    {req.date || new Date(req.id).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
