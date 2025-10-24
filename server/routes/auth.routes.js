import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  googleAuth,
  getMe,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google", googleAuth);

// Protected routes
// Note: We'll implement authentication check in the controller for now
router.get("/me", getMe);
router.post("/change-password", changePassword);

export default router;