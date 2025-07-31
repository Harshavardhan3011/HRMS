// src/Components/EmployeeChat.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../Pages/DashboardLayout";
import { db } from "../firebaseConfig";
import { ref, push, onValue } from "firebase/database"; 

export default function EmployeeChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch messages from Firebase
  useEffect(() => {
    const messagesRef = ref(db, "chatMessages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const msgs = Object.values(data);
      setMessages(msgs);
    });
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await push(ref(db, "chatMessages"), {
      sender: user.email,
      text,
      timestamp: new Date().toLocaleString(),
    });

    setText("");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">Employee Chat</h1>

      <div className="bg-white/10 p-6 rounded-lg h-96 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === user.email ? "text-green-400" : "text-white"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
            <div className="text-xs text-gray-400">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 rounded bg-white/10 border border-white/30 text-white"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white font-semibold"
        >
          Send
        </button>
      </form>
    </DashboardLayout>
  );
}
