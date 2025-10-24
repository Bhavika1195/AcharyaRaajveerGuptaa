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

mongoose.connect(process.env.VITE_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);


connectDB();

export const instance = new Razorpay({
  key_id: 'rzp_test_RHvg8lHcc6xNXJ',
  key_secret: '8AVjUq2ZJYpODN7NE1UNJrcH',
});

console.log("RAZORPAY_KEY_ID:", instance.key_id);
console.log("RAZORPAY_KEY_SECRET:", instance.key_secret);

app.listen(process.env.VITE_APP_PORT, () => {
  console.log(`App is running on port ${process.env.VITE_APP_PORT}`);
});
