import mongoose from "mongoose";

// create schema

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
