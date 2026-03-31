import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  type: String,
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
