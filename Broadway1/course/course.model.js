import mongoose from "mongoose";

// ? set rule/ struture / schema

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  }, //in days
  addedBy: {
    type: mongoose.ObjectId,
    ref: "Admin",
    required: true,
  },
});

// ? cerate model or table
const Course = mongoose.model("Course", courseSchema);

export default Course;
