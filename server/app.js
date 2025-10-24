import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

// Routes
import paymentRoute from "./routes/payment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import productRoutes from "./routes/product.routes.js";
import horoscopeRoutes from "./routes/horoscope.routes.js";
import questionRoutes from "./routes/question.routes.js";
import otpRoutes from "./routes/otp.routes.js";

// config({ path: "./config/config.env" });
config({ path: ".env" });
// require('dotenv').config()

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/horoscopes", horoscopeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/otp", otpRoutes);

// Razorpay key endpoint
app.get("/api/getkey", (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID || 'rzp_test_RHvg8lHcc6xNXJ'
    });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running"
    });
});
