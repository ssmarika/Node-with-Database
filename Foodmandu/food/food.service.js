import Yup from "yup";
import Food from "./food.model.js";
import mongoose from "mongoose";

export const validateFoodData = async (req, res, next) => {
  const foodValidationSchema = Yup.object({
    name: Yup.string().required().trim().max(55),
    price: Yup.number().required().min(0),
  });
  try {
    const validateData = await foodValidationSchema.validate(req.body);
    req.body = validateData;
  } catch (error) {
    return res.status(404).send({ message: "Data structure is not valid" });
  }

  next();
};

export const addFood = async (req, res) => {
  const newItem = req.body;
  await Food.create(newItem);
  return res.status(201).send({ message: "Added successfully", iten: newItem });
};

export const listFood = async (req, res) => {
  const foodList = await Food.find();
  return res.status(200).send({ message: "List of Foods", FoodList: foodList });
};

export const validateMongoId = (req, res, next) => {
  const id = req.params.id;

  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(404).send({ message: "Invalid MongoID" });
  }

  next();
};

export const findItem = async (req, res, next) => {
  const requiredFoodItem = await Food.findById(req.params.id);

  if (!requiredFoodItem) {
    return res.status(404).send({ message: "Food Item not found " });
  }
  req.foodItem = requiredFoodItem;
  //req is actually an object so we make an extra field inside this object so that we can easily access it

  next();
};

export const listFoodbyId = async (req, res) => {
  return res
    .status(201)
    .send({ message: "Food item found", foodList: req.foodItem });
};

export const deleteFoodbyId = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  return res.status(200).send({ messgae: "Item deleted successfully" });
};

export const listbyPrice = async (req, res) => {
  const foodByPrice = await Food.aggregate([
    { $match: {} },
    { $sort: { price: -1 } },
  ]);
  return res
    .status(201)
    .send({ message: "Items sorted", sortedList: foodByPrice });
};

export const updateItem = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  await Food.updateOne({ _id: id }, { $set: { ...data } });
  return res
    .status(201)
    .send({ message: "Food item updated successfully", updatedItem: data });
};
