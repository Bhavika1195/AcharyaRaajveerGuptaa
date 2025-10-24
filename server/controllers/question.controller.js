import { Question } from "../models/question.model.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Helper function to get user from token
const getUserFromToken = async (req) => {
  // Get token from header
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return { error: "Not authorized, no token", status: 401 };
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
    const user = await User.findById(decoded.id);
    if (!user) {
      return { error: "User not found", status: 404 };
    }
    
    return { user };
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
};

// Get all published questions
export const getAllQuestions = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, isAnswered } = req.query;
    const query = { isPublished: true };

    // Filter by tag if provided
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Filter by answered status if provided
    if (isAnswered !== undefined) {
      query.isAnswered = isAnswered === "true";
    }

    const questions = await Question.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("user", "name")
      .populate("answers.user", "name");

    const total = await Question.countDocuments(query);

    res.status(200).json({
      success: true,
      data: questions,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id)
      .populate("user", "name")
      .populate("answers.user", "name");

    if (!question || !question.isPublished) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new question
export const createQuestion = async (req, res) => {
  try {
    // Check authentication
    const result = await getUserFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const { title, content, tags } = req.body;

    const question = await Question.create({
      title,
      content,
      tags: tags || [],
      user: result.user._id,
    });

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add answer to question
export const addAnswer = async (req, res) => {
  try {
    // Check authentication
    const result = await getUserFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Answer content is required" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Add answer
    question.answers.push({
      content,
      user: result.user._id,
    });

    // Mark as answered
    question.isAnswered = true;
    await question.save();

    // Populate user info for the new answer
    const updatedQuestion = await Question.findById(id)
      .populate("user", "name")
      .populate("answers.user", "name");

    res.status(200).json({
      success: true,
      data: updatedQuestion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete question (admin or owner only)
export const deleteQuestion = async (req, res) => {
  try {
    // Check authentication
    const result = await getUserFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Check if user is admin or question owner
    if (result.user.role !== "admin" && question.user.toString() !== result.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this question" });
    }

    await Question.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};