
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoUri = (process.env.MONGODB_URI || "").replace(/\/$/, "");
    const connection = await mongoose.connect(
      `${mongoUri}/${DB_NAME}`
    );
    console.log("✅ MongoDB Connected Successfully!");
    console.log(`Database Name : ${connection.connection.name}`);
    console.log(`Host : ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
