export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

// ✅ GET ALL FILES
export async function GET() {
  try {
    await connectDB();

    const images = await Image.find().sort({ _id: -1 });

    return Response.json({ images });
  } catch (err) {
    console.error(err);

    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

// ✅ SAVE FILE (FROM CLOUDINARY)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // 🔥 VALIDATION (important)
    if (!body.url || !body.public_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newImage = await Image.create({
      url: body.url,
      public_id: body.public_id,
      type: body.type || "image", // fallback
    });

    return Response.json({
      success: true,
      image: newImage,
    });
  } catch (err) {
    console.error("SAVE ERROR:", err);

    return Response.json({ error: "Failed to save image" }, { status: 500 });
  }
}
