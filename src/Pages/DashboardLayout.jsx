import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
