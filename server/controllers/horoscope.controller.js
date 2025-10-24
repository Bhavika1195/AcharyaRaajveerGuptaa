import { Horoscope } from "../models/horoscope.model.js";
import slugify from "slugify";
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

// Get all published horoscopes
export const getAllHoroscopes = async (req, res) => {
  try {
    const { zodiacSign, period } = req.query;
    const query = { isPublished: true };

    // Filter by zodiac sign if provided
    if (zodiacSign) {
      query.zodiacSign = zodiacSign.toLowerCase();
    }

    // Filter by period if provided
    if (period) {
      query.period = period.toLowerCase();
    }

    const horoscopes = await Horoscope.find(query)
      .sort({ date: -1 })
      .populate("author", "name");

    res.status(200).json({
      success: true,
      data: horoscopes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get horoscope by slug
export const getHoroscopeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const horoscope = await Horoscope.findOne({ slug, isPublished: true }).populate(
      "author",
      "name"
    );

    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found" });
    }

    res.status(200).json({
      success: true,
      data: horoscope,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create new horoscope (admin only)
export const createHoroscope = async (req, res) => {
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
    
    const { title, content, zodiacSign, period, date } = req.body;

    // Create slug from title
    const slug = slugify(title, { lower: true });

    // Check if slug already exists
    const existingHoroscope = await Horoscope.findOne({ slug });
    if (existingHoroscope) {
      return res.status(400).json({ message: "Horoscope with this title already exists" });
    }

    const horoscope = await Horoscope.create({
      title,
      slug,
      content,
      zodiacSign: zodiacSign.toLowerCase(),
      period: period.toLowerCase(),
      date: new Date(date),
      author: result.user._id,
      isPublished: true,
    });

    res.status(201).json({
      success: true,
      data: horoscope,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update horoscope (admin only)
export const updateHoroscope = async (req, res) => {
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
    const { title, content, zodiacSign, period, date, isPublished } = req.body;

    const horoscope = await Horoscope.findById(id);
    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found" });
    }

    // Update slug if title is changed
    let slug = horoscope.slug;
    if (title && title !== horoscope.title) {
      slug = slugify(title, { lower: true });
      
      // Check if new slug already exists
      const existingHoroscope = await Horoscope.findOne({ slug, _id: { $ne: id } });
      if (existingHoroscope) {
        return res.status(400).json({ message: "Horoscope with this title already exists" });
      }
    }

    const updatedHoroscope = await Horoscope.findByIdAndUpdate(
      id,
      {
        title: title || horoscope.title,
        slug,
        content: content || horoscope.content,
        zodiacSign: zodiacSign ? zodiacSign.toLowerCase() : horoscope.zodiacSign,
        period: period ? period.toLowerCase() : horoscope.period,
        date: date ? new Date(date) : horoscope.date,
        isPublished: isPublished !== undefined ? isPublished : horoscope.isPublished,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedHoroscope,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete horoscope (admin only)
export const deleteHoroscope = async (req, res) => {
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

    const horoscope = await Horoscope.findById(id);
    if (!horoscope) {
      return res.status(404).json({ message: "Horoscope not found" });
    }

    await Horoscope.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Horoscope deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};