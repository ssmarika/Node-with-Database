import express from "express";
import {
  validateCourseData,
  addCourse,
  listCourse,
  validMongoID,
  findID,
  getCourse,
  deletebyid,
  sortbyprice,
  updatebyid,
} from "./course.service.js";

const router = express.Router();

// ? add course
router.post("/course/add", validateCourseData, addCourse);

// ? get all course
router.get("/course/list", listCourse);

// ? get course by id
router.get("/course/list/:id", validMongoID, findID, getCourse);

// ? delete by id
router.delete("/course/delete/:id", validMongoID, findID, deletebyid);

// ? sort by price
router.get("/course/sort", sortbyprice);

// ? update by id
router.put("/course/update/:id", validMongoID, findID, updatebyid);

export default router;
