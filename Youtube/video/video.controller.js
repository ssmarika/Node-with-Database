import express from "express";
import Video from "./video.model.js";

const router = express.Router();

// ? add video

router.post("/video/add", async (req, res) => {
  const newVideo = req.body;

  await Video.create(newVideo);

  return res.status(200).send({ message: "Video added", video: newVideo });
});

// ? get video
router.get("/video/list", async (req, res) => {
  const video = await Video.find();
  return res.status(200).send({ message: "Video list", video: video });
});

export default router;
