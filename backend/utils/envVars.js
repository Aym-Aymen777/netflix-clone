import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("backend/.env") });

export const envVars = {
  PORT: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI ,
  jwtSecret:process.env.JWT_SECRET,
  NODE_ENV :process.env.NODE_ENV,
  TMDB_API_KEY:process.env.TMDB_API_KEY
}