import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // ✅ Make sure firebase.js exports `db`
import { ref, onValue, update } from "firebase/database";

export default function RequestManager() {
  const [requests, setRequests] = useState([]);

  // Fetch leave requests from Firebase Realtime Database
  useEffect(() => {
    const requestsRef = ref(db, "leaveRequests");
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Convert Firebase object to array
      const list = Object.entries(data).map(([id, req]) => ({ id, ...req }));
      setRequests(list.reverse()); // Show latest first
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Approve/Reject a request
  const handleAction = async (id, action) => {
    try {
      await update(ref(db, `leaveRequests/${id}`), { status: action });
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-400">No leave requests yet.</p>
      ) : (
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-2">Employee</th>
              <th className="py-2">Reason</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-gray-700 hover:bg-white/5">
                <td className="py-2">{req.userEmail || "Unknown"}</td>
                <td className="py-2">{req.reason}</td>
                <td className="py-2 font-medium">{req.status}</td>
                <td className="py-2 space-x-2">
                  <button
                    onClick={() => handleAction(req.id, "Approved")}
                    disabled={req.status !== "Pending"}
                    className={`px-3 py-1 rounded ${
                      req.status === "Pending"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, "Rejected")}
                    disabled={req.status !== "Pending"}
                    className={`px-3 py-1 rounded ${
                      req.status === "Pending"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
