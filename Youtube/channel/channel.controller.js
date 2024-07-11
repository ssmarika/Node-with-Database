import express from "express";
import Channel from "./channel.model.js";

const router1 = express.Router();

// ?add channel
router1.post("/channel/add", async (req, res) => {
  const newChannel = req.body;

  await Channel.create(newChannel);

  return res
    .status(200)
    .send({ message: "Channel added", channel: newChannel });
});

export default router1;
