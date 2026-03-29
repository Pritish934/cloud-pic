"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/PasswordGate";

export default function Home() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  // ✅ Upload Image
  const uploadImage = async () => {
    if (!file) {
      alert("Select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        setImages((prev) => [data, ...prev]);
        setFile(null);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading");
    }
  };

  // ✅ Fetch Images
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");

      if (!res.ok) {
        console.error("Server error");
        return;
      }

      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  // ✅ Download Function (works everywhere)
  const downloadImage = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "image.jpg";
    link.click();
  };

  //delete function
  const deleteImage = async (id, public_id) => {
    const res = await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, public_id }),
    });

    const data = await res.json();

    if (data.success) {
      setImages((prev) => prev.filter((img) => img._id !== id));
    } else {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <PasswordGate>
      <div className="min-h-screen bg-linear-to-br from-pink-100 to-pink-200 p-4">
        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-bold text-pink-600 mb-6">
          PinkCloud ☁️
        </h1>

        {/* Upload Box */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-3 w-full text-sm"
          />

          <button
            onClick={uploadImage}
            className="w-full bg-pink-500 text-white py-2 rounded-lg active:scale-95 transition"
          >
            Upload Image
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white p-2 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={img.url}
                className="w-full h-32 sm:h-36 object-cover rounded mb-2"
              />

              <button
                onClick={() => downloadImage(img.url)}
                className="w-full bg-pink-500 text-white py-1.5 rounded text-sm"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </PasswordGate>
  );
}
