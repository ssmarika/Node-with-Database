import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://smarikashrestha02:${encodeURIComponent(
        "smarika123"
      )}@cluster0.yv6arsk.mongodb.net/broadway_data?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("DB connection established");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error.massage);
    process.exit();
  }
};

export default connectDB;
