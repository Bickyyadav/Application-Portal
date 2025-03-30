import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected successfully");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
  }
};

export default connectDB;
