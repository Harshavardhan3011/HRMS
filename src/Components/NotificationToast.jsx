import React from "react";
export default function NotificationToast({ show, message, type = "info" }) {
  if (!show) return null;
  return (
    <div
      className={`fixed bottom-5 right-5 z-50 px-6 py-3 shadow-lg rounded font-bold max-w-xs sm:max-w-md
        ${type === "success" ? "bg-green-600 text-white" : type === "error" ? "bg-red-600 text-white" : "bg-blue-600 text-white"}
        animate-slideup`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
