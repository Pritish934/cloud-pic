"use client";

import { useState, useEffect } from "react";

export default function PasswordGate({ children }) {
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check localStorage safely (mobile fix)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("auth");
      if (saved === "true") {
        setAuthorized(true);
      }
      setLoading(false);
    }
  }, []);

  const handleSubmit = async () => {
    if (!input) {
      alert("Enter password");
      return;
    }

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ IMPORTANT FIX
        },
        body: JSON.stringify({ password: input }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("auth", "true");
        setAuthorized(true);
      } else {
        alert("Wrong password");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // ✅ Prevent flash on mobile
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <p className="text-pink-500">Loading...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-4 text-pink-500">
            Private Cloud 🔒
          </h2>

          <input
            type="password"
            placeholder="Enter password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full mb-3 p-2 border rounded text-base"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-pink-500 text-white py-2 rounded active:scale-95"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return children;
}
