"use client";

import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

export default function ImageGrid() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();

      console.log("API RESPONSE:", data); // 🔍 DEBUG

      // ✅ SAFETY FIX (never breaks)
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setImages([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = (id) => {
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!images || images.length === 0) {
    return <p className="text-center mt-10">No images found</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {(Array.isArray(images) ? images : []).map((img) => (
        <ImageCard key={img._id} image={img} onDelete={handleDelete} />
      ))}
    </div>
  );
}
