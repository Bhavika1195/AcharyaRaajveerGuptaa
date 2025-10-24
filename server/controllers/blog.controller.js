import { Blog } from "../models/blog.model.js";
import slugify from "slugify";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Helper function to get user ID from token
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

// Get all published blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag } = req.query;
    const query = { isPublished: true };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by tag if provided
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("author", "name");

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug, isPublished: true }).populate(
      "author",
      "name"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new blog (admin only)
export const createBlog = async (req, res) => {
  try {
    // Check authentication and admin status
    const result = await getUserFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    // Check if user is admin
    if (result.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    
    const { title, content, excerpt, coverImage, tags, category } = req.body;

    // Create slug from title
    const slug = slugify(title, { lower: true });

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: "Blog with this title already exists" });
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      tags,
      category,
      author: result.user._id,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update blog (admin only)
export const updateBlog = async (req, res) => {
  try {
    // Check authentication and admin status
    const result = await getUserFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    // Check if user is admin
    if (result.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    
    const { id } = req.params;
    const { title, content, excerpt, coverImage, tags, category, isPublished } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update slug if title is changed
    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = slugify(title, { lower: true });
      
      // Check if new slug already exists
      const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existingBlog) {
        return res.status(400).json({ message: "Blog with this title already exists" });
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title || blog.title,
        slug,
        content: content || blog.content,
        excerpt: excerpt || blog.excerpt,
        coverImage: coverImage || blog.coverImage,
        tags: tags || blog.tags,
        category: category || blog.category,
        isPublished: isPublished !== undefined ? isPublished : blog.isPublished,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete blog (admin only)
export const deleteBlog = async (req, res) => {
  try {
    // Check authentication and admin status
    const result = await getUserFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    // Check if user is admin
    if (result.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
    
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get blog categories
export const getBlogCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category", { isPublished: true });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get blog tags
export const getBlogTags = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }, "tags");
    const tagsArray = blogs.flatMap(blog => blog.tags);
    const uniqueTags = [...new Set(tagsArray)];

    res.status(200).json({
      success: true,
      data: uniqueTags,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};