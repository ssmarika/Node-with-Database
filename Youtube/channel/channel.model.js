import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: String,
  noOfSubs: Number,
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
