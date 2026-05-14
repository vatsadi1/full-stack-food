import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("DB ENV 👉", process.env.MONGO_URI);

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};