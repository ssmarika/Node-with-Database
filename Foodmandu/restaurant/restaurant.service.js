import mongoose from "mongoose";
import Restaurant from "./restaurant.model.js";
import Yup from "yup";

export const restaurantDataValidation = async (req, res, next) => {
  // ?console.log("first");
  // ?next();
  // ?console.log("after next is executed");
  // ?here first is printed initially then next calls the immediate function
  // ?then later the after next message is printed

  // ! this middleware will now be used for data validation
  // ?incorrect data can crash the entire database so we validate it first

  const restaurantValidationSchema = Yup.object({
    name: Yup.string().required().trim().max(55),
    location: Yup.string().required().trim().max(55),
    contact: Yup.string().trim().required().max(55),
    ownerName: Yup.string().max(55).default(null),
  });

  try {
    const validatedData = await restaurantValidationSchema.validate(req.body);
    req.body = validatedData;
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
  next();
};

export const addRestaurant = async (req, res) => {
  // ?extract new values from req body
  const newRestaurant = req.body;

  // ?insert into db
  await Restaurant.create(newRestaurant);
  return res.status(200).send({ message: "Adding", Restaurant: newRestaurant });
};

export const validateMongoID = (req, res, next) => {
  //?extract restaurant id from req params
  const id = req.params.id;

  //check for mongo id validity
  const isValid = mongoose.isValidObjectId(id);

  // if not valid mongo id throw error
  if (!isValid) {
    return res.status(404).send({ message: "Invalid mongo id" });
  }
  next();
};

export const deleteRestaurant = async (req, res) => {
  //extract restaurant id from req.params
  const restaurantId = req.params.id;

  //find restaurant
  const requiredRestaurant = await Restaurant.findById(restaurantId);

  //if not restaurant throw error
  if (!requiredRestaurant) {
    return res.status(200).send({ message: "Restaurant does not exist" });
  }

  //delete restaurant
  await Restaurant.findByIdAndDelete(restaurantId);

  //send response
  return res.status(200).send({ message: "Deleting" });
};
