"use client";

import { useState, useEffect } from "react";
import ImageCard from "./ImageCard";

export default function ImageGrid() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error("Failed to fetch images", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle delete (instant UI update)
  const handleDelete = (id) => {
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">Loading images...</div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No images uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((img) => (
        <ImageCard key={img._id} image={img} onDelete={handleDelete} />
      ))}
    </div>
  );
}
