import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../Pages/DashboardLayout";

export default function EmployeeChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch messages from API on mount
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/chat/messages");
        const data = await res.json();
        setMessages(data || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }
    fetchMessages();

    // Optional: implement WebSocket here for real-time updates
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      sender: user.email,
      text: text.trim(),
      timestamp: new Date().toLocaleString(),
    };

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
      if (res.ok) {
        setMessages((prev) => [...prev, newMessage]);
        setText("");
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      alert("Failed to send message: " + error.message);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6 text-green-400">Employee Chat</h1>

      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-6 rounded-lg h-96 overflow-y-auto mb-4 text-white shadow-lg flex flex-col">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-20">No messages yet. Say Hi!</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 max-w-[80%] p-3 rounded-lg break-words self-start ${
              msg.sender === user.email ? "bg-green-600 self-end text-white" : "bg-gray-700 text-green-400"
            }`}
          >
            <div className="font-semibold mb-1 truncate">{msg.sender}</div>
            <div>{msg.text}</div>
            <div className="text-xs text-gray-300 mt-1 text-right">{msg.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-4 py-3 rounded-lg bg-gray-900 border border-green-600 text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Send
        </button>
      </form>
    </DashboardLayout>
  );
}
