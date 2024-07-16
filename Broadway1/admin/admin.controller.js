import express from "express";
import { validateData } from "./admin.validation.js";
import Admin from "./admin.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

// ? add router
router.post("/add", validateData, async (req, res) => {
  // extract new admin from req.body
  const newAdmin = req.body;

  //find admin using provided email
  const admin = await Admin.findOne({ email: newAdmin.email });

  //if admin exist, throw error

  if (admin) {
    return res.status(409).send({ message: "Admin already exist" });
  }

  //generate hashed password
  const plainPassword = newAdmin.password;
  const saltRound = 10; //increase randomness
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

  newAdmin.password = hashedPassword;

  await Admin.create(newAdmin);

  return res.status(201).send({ message: "Adding" });
});
export default router;
