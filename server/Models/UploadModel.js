import mongoose from "mongoose";

const uploadSchema = mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Upload", uploadSchema);
