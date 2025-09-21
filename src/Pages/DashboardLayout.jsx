// src/Pages/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#060110] via-[#0b0515] to-[#f40606] text-green-300">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-grow overflow-y-auto container mx-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
