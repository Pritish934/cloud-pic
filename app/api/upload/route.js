export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // ✅ Convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Upload to Cloudinary
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "pinkcloud", resource_type: "auto" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    // ✅ Save to MongoDB
    const newImage = await Image.create({
      url: upload.secure_url,
      public_id: upload.public_id,
      type: upload.resource_type,
    });

    // ✅ FIXED RESPONSE (VERY IMPORTANT)
    return Response.json({
      success: true,
      image: newImage,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
