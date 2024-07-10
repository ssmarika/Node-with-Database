import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://smarikashrestha02:smarika123@cluster0.yv6arsk.mongodb.net/kec-b4-foodmandu?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("DB established...");
  } catch (error) {
    console.log("DB connection failed ...");
    console.log(error.message);
  }
};

export default connectDB;
