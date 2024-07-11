import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  region: String,
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
