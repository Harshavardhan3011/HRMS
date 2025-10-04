import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#020617] via-[#1e293b] to-[#0f172a] text-green-400 py-6 text-center shadow-inner">
      <p className="text-sm select-none">&copy; {new Date().getFullYear()} HUSREX. All rights reserved.</p>
    </footer>
  );
}
