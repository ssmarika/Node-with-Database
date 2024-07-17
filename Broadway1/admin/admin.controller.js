import express from "express";
import {
  adminValidationSchema,
  loginAdminValidationSchema,
} from "./admin.validation.js";
import Admin from "./admin.model.js";
import bcrypt from "bcrypt";
import validateReqBody from "../middlewares/validation.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ? add or register router
router.post(
  "/register",
  validateReqBody(adminValidationSchema),

  async (req, res) => {
    // extract new admin from req.body
    const newAdmin = req.body;

    //find admin using provided email
    const admin = await Admin.findOne({ email: newAdmin.email });

    //if admin exist, throw error

    if (admin) {
      return res.status(409).send({ message: "Admin already exist" });
    }

    // ! PASSWORD AND BCRYPT ALGORITHM
    // generate hashed password
    // we hash the password for the purpose of safety.
    // when we use unhashed password, password are visible in database which is a security threat

    // bcrypt algorithm are slow by default
    // these are one way algorithm once converted to hash password we cannot recover the plain password
    // * bcrypt has hash and compare
    const plainPassword = newAdmin.password;
    const saltRound = 10; //increase randomness
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    newAdmin.password = hashedPassword;

    await Admin.create(newAdmin);

    return res.status(201).send({ message: "Adding" });
  }
);

// ? login admin
//if something is passed in the body of the req then it cannot be get

router.get(
  "/login",
  validateReqBody(loginAdminValidationSchema),

  async (req, res) => {
    //extract login credentials from req.body
    const loginCredentials = req.body;

    // find admin using email
    const admin = await Admin.findOne({ email: loginCredentials.email });

    // if not admin found, throw error
    if (!admin) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }

    // check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = admin.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    // if not password match throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }

    //hide password
    admin.password = undefined;
    //making it undefined makes js not display it on the screen

    // ! JSON WEB TOKEN
    // bcrypt is a slow algorithm so we can also use jwt
    // it is a fast algorithm so we do not need to use async and await

    // generate access token
    const payload = { email: admin.email };
    const sign = "hello";

    const token = jwt.sign(payload, sign);

    // send res
    return res
      .status(201)
      .send({ message: "login", admin, accessToken: token });
  }
);
export default router;
