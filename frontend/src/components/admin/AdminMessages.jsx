import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function AdminMessages() {
  const { token } = useAdmin();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data.messages);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`${API}/contact/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)),
        );
      }
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`${API}/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-12">
        Loading messages...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Contact Messages
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {messages.filter((m) => !m.isRead).length} unread
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border p-5 ${
                msg.isRead
                  ? "bg-gray-800/30 border-gray-700"
                  : "bg-gray-800/60 border-accent-500/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0" />
                    )}
                    <h3 className="font-semibold text-white truncate">
                      {msg.subject}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm mb-3">
                    <span className="text-white font-medium">{msg.fullName}</span>
                    <span className="text-gray-600">|</span>
                    <span className="text-accent-400 font-mono bg-accent-500/10 px-2 py-0.5 rounded text-xs font-semibold">
                      {msg.email}
                    </span>
                    <span className="text-gray-600">|</span>
                    <span>
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="px-3 py-1.5 text-xs bg-accent-600 hover:bg-accent-700 text-white rounded transition"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
