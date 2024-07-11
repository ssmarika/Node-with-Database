import express from "express";
import connectDB from "./connectdb.js";
import VideoRouter from "./video/video.controller.js";
import ChannelRouter from "./channel/channel.controller.js";
const app = express();

// to make app understand
app.use(express.json());

//connect database
connectDB();

//register video
app.use(VideoRouter);

// register channel
app.use(ChannelRouter);

// network and port configuration
const PORT = 8088;

app.listen(PORT, () => {
  console.log(`App is listening to ${PORT}`);
});
