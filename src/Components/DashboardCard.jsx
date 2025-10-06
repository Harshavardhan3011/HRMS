import React from "react";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  colorClass,
  tooltipText,
  onClick,
  active,
}) {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={title}
      title={tooltipText}
      aria-describedby={tooltipText ? "dashboard-tooltip" : undefined}
      className={`
        bg-white/10 p-6 rounded-lg shadow-md text-center transition-all
        cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-green-400
        ${active ? "ring-4 ring-green-500 bg-white/20" : ""}
        hover:bg-white/20
        `}
      onClick={onClick}
      onKeyPress={(e) => e.key === "Enter" && onClick?.()}
    >
      <Icon className={`mx-auto h-10 w-10 mb-3 ${colorClass}`} />
      <h3 className="text-xl font-semibold mb-2 text-green-300">{title}</h3>
      <p className="text-4xl font-extrabold text-white">{value}</p>
      {tooltipText && (
        <span className="visually-hidden" id="dashboard-tooltip">
          {tooltipText}
        </span>
      )}
    </div>
  );
}
