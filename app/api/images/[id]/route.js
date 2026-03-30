export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

// ✅ DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // ✅ FIX HERE
    const { id } = await params;

    console.log("DELETE ID:", id);

    const deleted = await Image.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);

    return Response.json(
      { success: false, error: "Delete failed" },
      { status: 500 },
    );
  }
}
