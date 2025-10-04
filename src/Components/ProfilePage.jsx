import React, { useEffect, useState } from "react";

const mockProfiles = {
  admin: {
    id: "1",
    name: "Alice Admin",
    phone: "123-456-7890",
    department: "Administration",
    joinDate: "2020-01-15",
    photoURL: "https://i.pravatar.cc/150?img=1",
    role: "Admin",
  },
  hr: {
    id: "2",
    name: "Henry HR",
    phone: "987-654-3210",
    department: "Human Resources",
    joinDate: "2019-05-23",
    photoURL: "https://i.pravatar.cc/150?img=2",
    role: "HR",
  },
  employee: {
    id: "3",
    name: "Emma Employee",
    phone: "555-123-4567",
    department: "Development",
    joinDate: "2021-08-10",
    photoURL: "https://i.pravatar.cc/150?img=3",
    role: "Employee",
  },
};

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    joinDate: "",
    photoURL: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate retrieving logged-in user from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.role) {
      setUser(savedUser);
      const profile = mockProfiles[savedUser.role.toLowerCase()] || mockProfiles.employee;
      setFormData({
        name: profile.name,
        phone: profile.phone,
        department: profile.department,
        joinDate: profile.joinDate,
        photoURL: profile.photoURL,
      });
    } else {
      setUser(null);
      setFormData({
        name: "",
        phone: "",
        department: "",
        joinDate: "",
        photoURL: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage("Name is required.");
      return;
    }
    // In a real app, save the formData to backend here
    setMessage("Profile updated successfully (mock).");
  };

  if (!user) {
    return <p className="text-gray-400 text-center py-10">No user logged in.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 rounded-xl shadow-lg text-white">
      <h1 className="text-4xl font-extrabold mb-6">My Profile ({user.role})</h1>
      {message && (
        <p className={`mb-6 ${message.startsWith("Error") ? "text-red-500" : "text-green-400"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSave} className="space-y-6">
        {/* form inputs same as before */}
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        {/* more fields: phone, department, joinDate, photoURL (same as your original code) */}
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {/* Department */}
        <div>
          <label htmlFor="department" className="block mb-1 font-semibold">
            Department
          </label>
          <input
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {/* Join Date */}
        <div>
          <label htmlFor="joinDate" className="block mb-1 font-semibold">
            Join Date
          </label>
          <input
            id="joinDate"
            name="joinDate"
            type="date"
            value={formData.joinDate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {/* Photo URL */}
        <div>
          <label htmlFor="photoURL" className="block mb-1 font-semibold">
            Photo URL
          </label>
          <input
            id="photoURL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-2 rounded border border-green-600 bg-gray-900 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
