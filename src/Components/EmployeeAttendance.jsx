// src/Components/EmployeeAttendance.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, set, update } from "firebase/database";
import dayjs from "dayjs";

export default function EmployeeAttendance() {
  const user = JSON.parse(localStorage.getItem("user"));
  const today = dayjs().format("YYYY-MM-DD");

  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const attendanceRef = ref(db, `attendance/${user.email.replace(/\./g, "_")}/${today}`);
    onValue(attendanceRef, (snapshot) => {
      setAttendance(snapshot.val() || null);
    });
  }, [user?.email]);

  const clockIn = () => {
    const now = dayjs().format("hh:mm A");
    set(ref(db, `attendance/${user.email.replace(/\./g, "_")}/${today}`), {
      clockIn: now,
      status: "Present",
    });
  };

  const clockOut = () => {
    const now = dayjs().format("hh:mm A");
    update(ref(db, `attendance/${user.email.replace(/\./g, "_")}/${today}`), {
      clockOut: now,
    });
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg mt-8">
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>

      {attendance ? (
        <div className="space-y-2">
          <p>Clock In: {attendance.clockIn || "Not yet"}</p>
          <p>Clock Out: {attendance.clockOut || "Not yet"}</p>
          {!attendance.clockOut && (
            <button
              onClick={clockOut}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold mt-2"
            >
              Clock Out
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={clockIn}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
        >
          Clock In
        </button>
      )}
    </div>
  );
}
