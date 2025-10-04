import React from "react";
import Tooltip from '@mui/material/Tooltip'; // or any tooltip library you prefer

export function DashboardCard({ title, value, icon: Icon, colorClass, tooltipText }) {
  return (
    <Tooltip title={tooltipText || ""} arrow>
      <div className={`bg-white/10 p-6 rounded-lg shadow-md text-center hover:bg-white/20 transition cursor-default`}>
        <Icon className={`mx-auto h-10 w-10 mb-3 ${colorClass}`} />
        <h3 className="text-xl font-semibold mb-2 text-green-300">{title}</h3>
        <p className="text-4xl font-extrabold text-white">{value}</p>
      </div>
    </Tooltip>
  );
}
