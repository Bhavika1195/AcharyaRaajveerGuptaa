import express from "express";
import {
  getAllHoroscopes,
  getHoroscopeBySlug,
  createHoroscope,
  updateHoroscope,
  deleteHoroscope,
} from "../controllers/horoscope.controller.js";

const router = express.Router();

// Public routes
router.get("/", getAllHoroscopes);
router.get("/:slug", getHoroscopeBySlug);

// Admin routes - authentication will be checked in controllers
router.post("/", createHoroscope);
router.put("/:id", updateHoroscope);
router.delete("/:id", deleteHoroscope);

export default router;