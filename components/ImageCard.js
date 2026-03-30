"use client";

import { useState } from "react";

export default function ImageCard({ image, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/images/${image._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      onDelete(image._id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group rounded-xl overflow-hidden shadow-lg">
      {/* Image */}
      <img
        src={image.url}
        alt="uploaded"
        className="w-full h-60 object-cover"
      />

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 z-50 bg-red-600 text-white px-3 py-1 text-sm rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
      >
        {loading ? "..." : "Delete"}
      </button>
    </div>
  );
}
