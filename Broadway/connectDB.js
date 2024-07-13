import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(
      "mongodb+srv://smarikashrestha02:smarika123@cluster0.yv6arsk.mongodb.net/kec-b4-broadway?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB connection established ...");
  } catch (error) {
    console.log("Connection failed");
    console.log("Error.message");
  }
};

export default connectDB;
