import mongoose from "mongoose";
import { envVars } from "../utils/envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envVars.mongoURI);
    if (!conn) {
      console.log("error in connecting database");
    }
    console.log("database connected successfully " + conn.connection.host);
  } catch (error) {
    console.log("connection error :", error);
    process.exit(1);
  }
};
