import React, { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Alice Admin",
    phone: "123-456-7890",
    department: "Administration",
    joinDate: "2020-01-15",
    photoURL: "https://i.pravatar.cc/150?img=1",
    email: "admin@company.com"
  });
  const [msg, setMsg] = useState("");
  const [imagePreview, setImagePreview] = useState(form.photoURL);

  const handleImageUpload = (e) => {
    if (!e.target.files?.[0]) return;
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = (e) => {
    e.preventDefault();
    setMsg("Profile updated!");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-8 rounded-xl shadow-lg text-white flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="profile-avatar-upload" />
        <label htmlFor="profile-avatar-upload" className="cursor-pointer">
          <img src={imagePreview} alt="Profile" className="rounded-full h-36 w-36 border-4 border-green-600 shadow-lg object-cover bg-gray-900" />
          <span className="block text-green-400 text-center mt-2 underline">Change Photo</span>
        </label>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 break-all">{form.name}</h1>
          <div className="mb-1 text-green-400 font-semibold capitalize">Admin</div>
          <div className="mb-1 text-green-200 break-all"><span className="font-bold">Email:</span> {form.email}</div>
          <div className="mb-1 text-green-300 font-bold">Department: {form.department}</div>
          <div className="mb-1 text-green-300 font-bold">Joined: {new Date(form.joinDate).toLocaleDateString()}</div>
        </div>
      </div>
      <form onSubmit={handleSave} className="space-y-6 bg-black/20 p-6 rounded-xl mt-6">
        <h2 className="text-2xl text-green-400 font-bold mb-2">Edit Profile</h2>
        {msg && <p className="mb-4 text-center text-green-400">{msg}</p>}
        <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 rounded border bg-gray-900 border-green-600 text-green-300" placeholder="Name" />
        <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 rounded border bg-gray-900 border-green-600 text-green-300" placeholder="Phone" />
        <input name="department" value={form.department} onChange={handleChange} className="w-full px-4 py-2 rounded border bg-gray-900 border-green-600 text-green-300" placeholder="Department" />
        <input name="joinDate" type="date" value={form.joinDate} onChange={handleChange} className="w-full px-4 py-2 rounded border bg-gray-900 border-green-600 text-green-300" />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded transition w-full sm:w-auto">Save Changes</button>
      </form>
    </div>
  );
}
