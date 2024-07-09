import mongoose from "mongoose";

const dbUserName = "smarikashrestha02";
const dbPassword = encodeURIComponent("smarika123");
const dbName = "kec-b4-netfilix";
const dbHost = "smarika123@cluster0.yv6arsk.mongodb.net";
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://smarikashrestha02:smarika123@cluster0.yv6arsk.mongodb.net/kec-b4-netflix?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB connection established");
  } catch (error) {
    console.log("DB connection failed..");
    console.log(error.message);
  }
};

export default connectDB;
