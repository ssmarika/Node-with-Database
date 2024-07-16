import express from "express";
import Order from "./order.model.js";
import mongoose from "mongoose";
import {
  validateCustomerandFoodId,
  isValidData,
  addOrder,
} from "./order.service.js";

const router = express.Router();

//? order place
router.post("/order/add", validateCustomerandFoodId, isValidData, addOrder);

// ? list the customer detail by id
router.get("/order/getCustomerDetail/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  console.log(typeof id);
  const CustomerDetails = await Order.aggregate([
    { $match: { _id: id } },
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "Cus",
      },
    },
    // { $project: { CustomerDetails: 1 } },
  ]);
  console.log(CustomerDetails);
  return res.status(201).send({ message: "Customer found", CustomerDetails });
});

export default router;
