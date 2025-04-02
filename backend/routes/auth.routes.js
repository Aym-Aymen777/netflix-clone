import express from "express";
import { authCheck, logIn, logOut, signUp } from "../controllers/auth.controllers.js";
import { ProtectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

router.get('/authcheck',ProtectRoute,authCheck)

export const authRoutes = router;
