import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://smarikashrestha02:smarika123@cluster0.yv6arsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connection established");
  } catch (error) {
    console.log("Connection failed");
    console.log(error.message);
  }
};

export default connectDB;
