import express from "express";
import Customer from "./customer.model.js";
import mongoose from "mongoose";

const router = express.Router();

//? add customer
router.post("/customer/add", async (req, res) => {
  //extract new customer from req.body
  const newCustomer = req.body;

  //insert customer
  await Customer.create(newCustomer);

  return res.status(201).send({ message: "Customer is added successfully" });
});

// ? get customer list
router.get("/customer/list", async (req, res) => {
  const customers = await Customer.find();
  return res
    .status(200)
    .send({ message: "list of customers", customerList: customers });
});

// ? get customer detail by id
router.get("/customer/detail/:id", async (req, res) => {
  // extract customer id from req.params
  const customerId = req.params.id;

  // check for mongo id validity

  const isValidId = mongoose.isValidObjectId(customerId);

  // if not valid mongo id , throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mondo id" });
  }

  // find customer using customerId
  const customer = await Customer.findOne({ _id: customerId });

  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist" });
  }
  // send res
  return res.status(200).send({ message: "Success", customerDetail: customer });
});
export default router;
