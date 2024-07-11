import mongoose from "mongoose";

// schema

const songsSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
  genre: String,
});

const Song = mongoose.model("Song", songsSchema);

export default Song;
