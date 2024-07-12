import express from "express";
import Song from "./songs.model.js";


const router = express.Router();

// ?add song
router.post("/song/add", async (req, res) => {
  // extract new customer from req.body
  const newSong = req.body;

  // insert song
  await Song.create(newSong);

  return res.status(200).send({ message: "Song added...", song: newSong });
});

// ?view song
router.get("/song/list", async (req, res) => {
  // extract from the db
  const songList = await Song.find();

  return res.status(200).send({ message: "Song list...", song: songList });
});

// ? view song by the song name
router.get("/song/list/:name", async (req, res) => {
  // extract customer id from req.params
  const songName = req.params.name;

  // find the song using songname

  const song = await Song.findOne({ name: songName });

  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }

  //send res
  return res.status(200).send({ message: "Song found", song: song });

  return res.status(200).send({ message: "Song displayed by the song name" });
});

export default router;
