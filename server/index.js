import express from 'express';
import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";
//
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productroutes.js';
import paymentRoutes from './routes/payment.routes.js';

import dotenv from "dotenv";
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);


connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? '***' : 'NOT SET');

const PORT = process.env.PORT || process.env.APP_PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
