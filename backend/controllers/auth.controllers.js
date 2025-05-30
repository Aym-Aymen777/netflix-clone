import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return res
        .status(400)
        .json({ success: false, message: "Username Already exist" });
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already exist" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const ProfileImages = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const rondomProfileImage =
      ProfileImages[Math.floor(Math.random() * ProfileImages.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: rondomProfileImage,
    });

    generateTokenAndSetCookies(newUser._id, res);
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in Signup controller : ", error.message);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, username, password } = req.body || {};
    if ((!email && !username) || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Both fields are required" });
    }
    const foundUser = await User.findOne({ $or: [{ email }, { username }] });
    if (foundUser === null) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookies(foundUser._id, res);
    await foundUser.save();

    res.status(200).json({
      success: true,
      message: "Logging Successfully",
      user: {
        ...foundUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in login controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix", {
      httpOnly: true,
      sameSite: "none", // CSRF attacks cross-site request forgery attacks
      secure: true, // set to true if using HTTPS, false for HTTP
    });
    res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log("error in logout controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authCheck = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "you are not authorized" });
    }

    return res
      .status(200)
      .json({ success: true, message: "you are authorized", user: req.user });
  } catch (error) {
    console.log("error in authCheck controller:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};
