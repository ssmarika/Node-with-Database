import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 55,
    trim: true,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  tutorName: {
    type: String,
    maxlength: 55,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
