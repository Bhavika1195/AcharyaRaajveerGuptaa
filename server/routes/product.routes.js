import express from "express";
import { productCheckout, verifyProductPayment } from "../controllers/product.controller.js";

const router = express.Router();

// Product routes - authentication will be checked in controllers
router.post("/checkout", productCheckout);
router.post("/verify", verifyProductPayment);

export default router;