import Course from "./course.model.js";
import Yup from "yup";
import mongoose from "mongoose";

export const validateCourseData = async (req, res, next) => {
  const courseValidationSchema = Yup.object({
    name: Yup.string().required().trim().max(55),
    duration: Yup.number().required(),
    tutorName: Yup.string().required().trim().max(55),
    price: Yup.number().required(),
  });

  try {
    const validatedData = await courseValidationSchema.validate(req.body);
    req.body = validatedData;
  } catch (error) {
    return res.status(200).message({ message: error.message });
  }
  next();
};

export const addCourse = async (req, res, next) => {
  const courseData = req.body;

  await Course.create(courseData);

  return res.status(200).send({ message: "Added", course: courseData });
};

export const listCourse = async (req, res) => {
  const courseList = await Course.find();
  return res.status(201).send({ message: courseList });
};

export const validMongoID = (req, res, next) => {
  const id = req.params.id;
  //
  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(404).send({ message: "Invalid mongo id" });
  }

  next();
};

export const findID = async (req, res, next) => {
  const isFound = await Course.findOne({ _id: req.params.id });

  if (!isFound) {
    return res.status(404).send({ message: "Id does not exist" });
  }
  next();
};

export const getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  return res.status(201).send({ message: "Course found", course: course });
};

export const deletebyid = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  return res.status(201).send({ message: "Course Delete" });
};

export const sortbyprice = async (req, res) => {
  const sortedList = await Course.aggregate([
    { $match: {} },
    { $sort: { price: -1 } },
  ]);
  return res
    .status(201)
    .send({ message: "Sorted List", sortedList: sortedList });
};

export const updatebyid = async (req, res) => {
  const id = req.params.id;
  const updatedInfo = req.body;
  await Course.updateOne({ _id: id }, { $set: { updatedInfo } });
  return res.status(201).send({ message: "Successfully updated" });
};
