import mongoose from "mongoose";

const resSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 55,
    trim: true,
    minlength: 10,
  },
  ownerName: {
    type: String,
    required: false,
    nullable: true,
    default: null,
    maxlength: 55,
  },
});

const Restaurant = mongoose.model("Restaurant", resSchema);

export default Restaurant;
