"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/PasswordGate";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Upload Image
  // const uploadImage = async () => {
  //   if (!file) {
  //     alert("Select an image");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();

  //     // ✅ IMPORTANT (expects { image: {...} })
  //     if (data.image) {
  //       setImages((prev) => [data.image, ...prev]);
  //       setFile(null);
  //     } else {
  //       alert("Upload failed");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error uploading");
  //   }
  // };
  const uploadImage = async () => {
    if (!files.length) return;

    try {
      const uploads = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        return res.json();
      });

      const results = await Promise.all(uploads);

      const newImages = results.filter((r) => r.image).map((r) => r.image);

      setImages((prev) => [...newImages, ...prev]);
      setFiles([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch Images
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();

      // ✅ SAFE FIX (no more map error)
      console.log("API RESPONSE:", data); // 🔍 DEBUG
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Download
  const downloadImage = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = url.split("/").pop();
    link.click();
  };

  // ✅ Delete (REAL DELETE)
  const deleteImage = async (id) => {
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
        console.log("Deleted image with ID:", id);
        console.log("API DELETE RESPONSE:", data);
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting");
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

        {/* Upload */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="mb-3 w-full text-sm"
          />

          <button
            onClick={uploadImage}
            className="w-full bg-pink-500 text-white py-2 rounded-lg active:scale-95"
          >
            Upload Image
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center">No images found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img._id} className="bg-white rounded-xl shadow p-2">
                {img.type === "video" ? (
                  <video
                    src={img.url}
                    controls
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                ) : (
                  <img
                    src={img.url}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}

                <button
                  onClick={() => deleteImage(img._id)}
                  className="w-full bg-red-500 text-white py-1.5 rounded text-sm"
                >
                  Delete
                </button>
                {/* DOWNLOAD BUTTON (BOTTOM) */}
                <div className="p-2">
                  <button
                    onClick={() => downloadImage(img.url)}
                    className="w-full bg-pink-500 text-white py-1.5 rounded text-sm mb-2"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PasswordGate>
  );
}
