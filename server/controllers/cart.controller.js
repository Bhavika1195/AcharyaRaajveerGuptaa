import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Helper function to get user ID from token
const getUserIdFromToken = async (req) => {
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
    return { userId: decoded.id };
  } catch (error) {
    return { error: "Invalid token", status: 401 };
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const userId = result.userId;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product already in cart
    const existingProductIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex > -1) {
      // Update quantity if product already in cart
      user.cart[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    // Populate product details
    const updatedUser = await User.findById(userId).populate("cart.product");

    res.status(200).json({
      success: true,
      cart: updatedUser.cart,
      message: "Product added to cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get cart items
export const getCart = async (req, res) => {
  try {
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const userId = result.userId;

    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const userId = result.userId;

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find product in cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update quantity
    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    // Populate product details
    const updatedUser = await User.findById(userId).populate("cart.product");

    res.status(200).json({
      success: true,
      cart: updatedUser.cart,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const userId = result.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove product from cart
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    // Populate product details
    const updatedUser = await User.findById(userId).populate("cart.product");

    res.status(200).json({
      success: true,
      cart: updatedUser.cart,
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const userId = result.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear cart
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get cart count
export const getCartCount = async (req, res) => {
  try {
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }
    
    const userId = result.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartCount = user.cart.reduce((total, item) => total + item.quantity, 0);

    res.status(200).json({
      success: true,
      count: cartCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};