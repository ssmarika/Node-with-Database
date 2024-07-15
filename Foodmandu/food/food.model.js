import mongoose from "mongoose";

// whenever new object we create new schema

// const quantityDetail = new mongoose.Schema({
//   value: Number,
//   unit: String,
// });

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
