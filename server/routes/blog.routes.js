import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCategories,
  getBlogTags,
} from "../controllers/blog.controller.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/categories", getBlogCategories);
router.get("/tags", getBlogTags);
router.get("/:slug", getBlogBySlug);

// Admin routes - authentication will be checked in controllers
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;