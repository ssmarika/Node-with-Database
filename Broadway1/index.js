import express from "express";
import { printBlue, printPink } from "./utils/color.console.js";
import connectDB from "./connect.db.js";
import adminRoutes from "./admin/admin.controller.js";
import courseRoutes from "./course/course.controller.js";

const app = express();

// ? make app understand json
app.use(express.json());

// ? register admin
app.use("/admin", adminRoutes);

// ? register course
app.use("/course", courseRoutes);

// ? connect database
await connectDB();
//you can only use await without async after certain node version

// ? PORT AND NETWORK CONFIGURATION
const PORT = 8000;
app.listen(PORT, () => {
  console.log(printPink(`App is listening on port ${PORT}`));
});
