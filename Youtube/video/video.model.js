import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  name: String,
  channel: String,
  category: String,
  duration: Number,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
