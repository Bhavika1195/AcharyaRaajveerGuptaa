import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

async function updateProductPrices() {
  await mongoose.connect(process.env.VITE_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Set a default price (change as needed)
  const defaultPrice = 100;

  const result = await Product.updateMany(
    { $or: [ { price: { $exists: false } }, { price: null }, { price: { $lte: 0 } } ] },
    { $set: { price: defaultPrice } }
  );

  console.log(`Updated ${result.nModified || result.modifiedCount} products with default price.`);
  mongoose.disconnect();
}

updateProductPrices().catch(console.error);
