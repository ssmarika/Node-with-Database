import express from "express";
import connectDB from "./connectDB.js";
import CourseRouter from "./course/course.controller.js";
const app = express();

// to make app undersatnd json
app.use(express.json());

//connect database
connectDB();

// register course
app.use(CourseRouter);

// port and network services
const PORT = 8010;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
