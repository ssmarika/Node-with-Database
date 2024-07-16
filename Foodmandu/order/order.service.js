import mongoose from "mongoose";
import Yup from "yup";
import Order from "./order.model.js";

export const validateCustomerandFoodId = (req, res, next) => {
  const newOrder = req.body;

  const ifValidCustomer = mongoose.isValidObjectId(newOrder.customerId);
  const ifValidFood = mongoose.isValidObjectId(newOrder.foodId);

  if (!ifValidCustomer || !ifValidFood) {
    return res.status(201).send({ message: "Invalid mongoid" });
  }

  next();
};

export const isValidData = (req, res, next) => {
  const dataSchema = Yup.object({
    customerId: Yup.string().required(),
    foodId: Yup.string().required(),
    quantity: Yup.number().min(1).required(),
  });

  const isValid = dataSchema.validate(req.body);

  if (!isValid) {
    return res.status(201).send({ message: "Invalid data" });
  }

  next();
};

export const addOrder = async (req, res) => {
  const newOrder = req.body;
  await Order.create(newOrder);
  return res.status(201).send({ message: "Order added" });
};
