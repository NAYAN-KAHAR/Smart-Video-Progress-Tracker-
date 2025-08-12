
import mongoose from "mongoose";

const videoUploadSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  title: { type: String, required: true },
  id: { type: Number, required: true },
});

const videoUploadModel = mongoose.model('VideoUploaded', videoUploadSchema);
export default videoUploadModel;
