import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://smarikashrestha02:smarika123@cluster0.yv6arsk.mongodb.net/kec-b4-spotify?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDb;
