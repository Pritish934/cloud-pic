import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function DELETE(req, { params }) {
  await connectDB();

  await Image.findByIdAndDelete(params.id);

  return Response.json({ success: true });
}
