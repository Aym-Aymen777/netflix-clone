import jwt from "jsonwebtoken";
import { envVars } from "../utils/envVars.js";

export const generateTokenAndSetCookies = (userId, res) => {
	const token = jwt.sign({ userId }, envVars.jwtSecret, { expiresIn: "15d" });

	res.cookie("jwt-netflix", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
		sameSite: "none", // CSRF attacks cross-site request forgery attacks
		secure: true,	 // set to true if using HTTPS, false for HTTP
	});

	return token;
};