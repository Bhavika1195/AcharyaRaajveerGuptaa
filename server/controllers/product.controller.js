import { instance } from "../index.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

// Create product checkout session
export const productCheckout = async (req, res) => {
  try {
    // Get user ID from token
    const result = await getUserIdFromToken(req);
    if (result.error) {
      return res.status(result.status).json({
        success: false,
        message: result.error,
      });
    }
    
    const userId = result.userId;
    const { productId, price, address } = req.body;
    
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    if (!productId || !price) {
      return res.status(400).json({
        success: false,
        message: "Product ID and price are required",
      });
    }

    const options = {
      amount: Number(price) * 100,
      currency: "INR",
      receipt: `PRODUCT_${nanoid()}`,
      notes: {
        productId: productId,
        userId: userId,
        address: JSON.stringify(address),
      },
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during product checkout:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Verify product payment
export const verifyProductPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Get order details
    const order = await instance.orders.fetch(razorpay_order_id);
    const { productId, userId, address } = order.notes;
    const shippingAddress = address ? JSON.parse(address) : {};

    // Get user and product details
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({
        success: false,
        message: "User or product not found",
      });
    }

    // Create payment record
    const payment = await Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      user: userId,
      product: productId,
      amount: order.amount / 100,
    });

    // Send email to user
    await sendProductPurchaseEmail(user, product, razorpay_payment_id, shippingAddress);

    // Redirect to success page
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-success?reference=${razorpay_payment_id}`
    );
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Send product purchase email
const sendProductPurchaseEmail = async (user, product, paymentId, address) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Your Purchase Confirmation - ${product.name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Purchase Confirmation</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #4a154b;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 5px 5px;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            .button {
              display: inline-block;
              background-color: #4a154b;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Your Purchase!</h1>
          </div>
          <div class="content">
            <p>Dear ${user.name},</p>
            <p>Thank you for your purchase. Your transaction was successful!</p>
            
            <h2>Purchase Details:</h2>
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h2>Shipping Address:</h2>
            <p>${address.line1 || ''}</p>
            <p>${address.line2 || ''}</p>
            <p>${address.city || ''}, ${address.state || ''} ${address.postalCode || ''}</p>
            <p>${address.country || 'India'}</p>
            
            <p>If you have any questions about your purchase, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>Achariya Debdutta Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Purchase confirmation email sent to:", user.email);
  } catch (error) {
    console.error("Error sending purchase confirmation email:", error);
  }
};