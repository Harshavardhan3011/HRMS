import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#060110] via-[#0b0515] to-[#f40606] text-green-400 py-6 text-center shadow-inner">
      <p className="text-sm select-none">&copy; {new Date().getFullYear()} HUSREX. All rights reserved.</p>
    </footer>
  );
}
