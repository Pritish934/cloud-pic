import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const images = await Image.find().sort({ createdAt: -1 });
  return NextResponse.json(images);
}
