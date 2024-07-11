import express from "express";
import Customer from "./customer.model.js";
import mongoose from "mongoose";

//API is event driven so API hit garyo bahne matra run huncha
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
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  // find customer using customerId
  const customer = await Customer.findOne({ _id: customerId });

  // !important
  // findOne returns null value when it finds nothing
  // null is a falsy value so simply(!customer) could be done
  // find returns an empty array if it finds nothing
  // empty array is not a falsy value so (!customer) becomes false and no error message is provided

  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist" });
  }
  // send res
  return res.status(200).send({ message: "Success", customerDetail: customer });
});

// ? delete from id
router.delete("/customer/delete/:id", async (req, res) => {
  // extract customer id from req.params
  const customerId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(customerId);

  // if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  // find customer using customer id
  // const customer = await Customer.findOne({ _id: customerId });
  const customer = await Customer.findById(customerId);

  // if not customer, throw error

  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist" });
  }

  // delete customer
  await Customer.deleteOne({ _id: customerId });
  // send res
  return res.status(200).send({ message: "Customer successfully deleted" });
});

// ? update customer by id
router.put("/customer/edit/:id", async (req, res) => {
  // extract customer id from req.params
  const customerId = req.params.id;

  // check for mongo id validity
  const isValid = mongoose.isValidObjectId(customerId);

  // if not valid mongo id, throw error
  if (!isValid) {
    return res.status(404).send({ message: "Invalid mongo Id" });
  }

  // find customer
  const customer = await Customer.findById(customerId);

  // if not customer, throw error
  if (!customer) {
    return res.status(404).send({ message: "Customer not found" });
  }

  // extract new values from req.body
  const newInfo = req.body;

  // update customer
  await Customer.updateOne({ _id: customerId }, { $set: { ...newInfo } });

  // send res
  return res
    .status(200)
    .send({ message: "Customer info successfully updated" });
});

export default router;
