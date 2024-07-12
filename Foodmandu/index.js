import express from "express";
import connectDB from "./connect.db.js";
import customerRoutes from "./customer/customer.controller.js";
import restaurantRoutes from "./restaurant/restaurant.controller.js";

const app = express();

// to make app understand json
app.use(express.json());

// database connection
connectDB();

// register customer
app.use(customerRoutes);

// register restaurant
app.use("/res", restaurantRoutes);
//this helps to reduce the /res in the api made in controller

// network port and server
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
