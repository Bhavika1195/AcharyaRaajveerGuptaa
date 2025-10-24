import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  addAnswer,
  deleteQuestion,
} from "../controllers/question.controller.js";

const router = express.Router();

// Public routes
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

// Protected routes - authentication will be checked in controllers
router.post("/", createQuestion);
router.post("/:id/answers", addAnswer);
router.delete("/:id", deleteQuestion);

export default router;