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
    const { id, public_id } = await req.json();

    await connectDB();

    // ❌ Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // ❌ Delete from MongoDB
    await Image.findByIdAndDelete(id);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}
