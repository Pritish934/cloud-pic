export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

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
