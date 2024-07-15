import express from "express";
import {
  addFood,
  validateFoodData,
  listFood,
  validateMongoId,
  findItem,
  listFoodbyId,
} from "./food.service.js";

const router = express.Router();

// ? add foods
router.post("/add", validateFoodData, addFood);

// ? get all food
router.get("/list", listFood);

// ? get all food by id
router.get("/list/:id", validateMongoId, findItem, listFoodbyId);

export default router;
