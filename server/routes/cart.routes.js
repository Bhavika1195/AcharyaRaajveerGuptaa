import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount,
} from "../controllers/cart.controller.js";

const router = express.Router();

// All cart routes - authentication will be checked in controllers
router.post("/", addToCart);
router.get("/", getCart);
router.put("/", updateCartItem);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);
router.get("/count", getCartCount);

export default router;