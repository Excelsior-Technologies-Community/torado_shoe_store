import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);



export default router;
