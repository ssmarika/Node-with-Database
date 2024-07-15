import express from "express";
import {
  addFood,
  validateFoodData,
  listFood,
  validateMongoId,
  findItem,
  listFoodbyId,
  deleteFoodbyId,
  listbyPrice,
  updateItem,
} from "./food.service.js";

const router = express.Router();

// ? add foods
router.post("/add", validateFoodData, addFood);

// ? get all food
router.get("/list", listFood);

// ? get all food by id
router.get("/list/:id", validateMongoId, findItem, listFoodbyId);

// ? delete food by id
router.delete("/delete/:id", validateMongoId, findItem, deleteFoodbyId);

// ?sort by price
router.get("/sort", listbyPrice);

// ? update item by id
router.put("/update/:id", validateMongoId, findItem, updateItem);

export default router;
