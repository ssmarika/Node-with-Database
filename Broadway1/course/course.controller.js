import express from "express";
import { courseValidationSchema } from "./course.validation.js";
import validateReqBody from "../middlewares/validation.middleware.js";
import jwt from "jsonwebtoken";
import Admin from "../admin/admin.model.js";
import Course from "./course.model.js";

const router = express.Router();

// ? add course
router.post(
  "/add",
  validateReqBody(courseValidationSchema),
  async (req, res, next) => {
    // extract token from req.headers
    const authorization = req.headers.authorization;

    const splittedTokenArray = authorization?.split(" ");

    const token =
      splittedTokenArray?.length == 2 ? splittedTokenArray[1] : null;

    // if not token , throw error
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    // verify token
    let payload;

    try {
      const sign = "hello";
      payload = jwt.verify(token, sign);
    } catch (error) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    console.log(payload);

    // find admin using payload
    const admin = await Admin.findOne({ email: payload.email });

    // if not admin throw error
    if (!admin) {
      return res.status(404).send({ message: "Unauthorized" });
    }

    //we need to add the addedby field which is actually the admins is so for that purpose we make a
    // variable that store the admins

    req.loggedInUserId = admin._id;

    // call next function

    next();
  },
  async (req, res) => {
    //extract course from the req. body
    const newCourse = req.body;
    newCourse.addedBy = req.loggedInUserId;

    // add course
    await Course.create(newCourse);

    // send res
    return res.status(201).send({ message: "Course added successfully" });
  }
);

export default router;
