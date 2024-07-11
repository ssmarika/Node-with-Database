import express from "express";
import connectDb from "./connectDB.js";
import SongsRouter from "./songs/songs.controller.js";
import SubscriberRouter from "./subscriber/subscriber.controller.js";

const app = express();

// to make app understand json
app.use(express.json());

// to connect to db
connectDb();

// register songs
app.use(SongsRouter);

// register Subscriber
app.use(SubscriberRouter);

//network and port connection
const PORT = 8008;

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
