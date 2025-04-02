import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { envVars } from "../utils/envVars.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, envVars.jwtSecret);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectrout function : ", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
