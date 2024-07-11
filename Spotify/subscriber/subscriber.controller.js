import express from "express";
import Subscriber from "./subscriber.model.js";

const router1 = express.Router();

// ? add subscriber
router1.post("/subscriber/add", async (req, res) => {
  const newSubscriber = req.body;

  await Subscriber.create(newSubscriber);

  return res
    .status(200)
    .send({ message: "Subscriber added", subscriber: newSubscriber });
});

export default router1;
