import express from 'express';
import Product from '../models/product.js';
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.VITE_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_APP_RAZORPAY_KEY_SECRET,
});

const router = express.Router();

// Handle product checkout (dummy endpoint, extend as needed)
router.post('/:id/checkout', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { amount } = req.body; // amount in paise from frontend

    // Create Razorpay order
    const options = {
      amount: amount, // in paise
      currency: "INR",
      receipt: `receipt_order_${product._id}`,
    };
    const order = await razorpay.orders.create(options);

    res.json({ order }); // <-- This is what your frontend expects!
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// Create a new product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle product purchase (dummy endpoint, extend as needed)
router.post('/:id/purchase', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    // Here you would handle payment logic, order creation, etc.
    res.json({ message: 'Purchase successful', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
