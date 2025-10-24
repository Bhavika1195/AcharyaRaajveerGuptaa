import nodemailer from "nodemailer";
import crypto from "crypto";

// Store OTPs in memory (in production, use Redis or a database)
const otpStore = {};

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
      pass: process.env.VITE_APP_GOOGLE_APP_PASSWORD,
    },
  });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
export const sendOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ message: "Email or phone number is required" });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration time (5 minutes)
    const identifier = email || phone;
    otpStore[identifier] = {
      otp,
      expiry: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // Send OTP via email if email is provided
    if (email) {
      const transporter = createTransporter();
      
      await transporter.sendMail({
        from: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
        to: email,
        subject: "Your OTP for Verification",
        html: `
          <h2>OTP Verification</h2>
          <p>Your OTP for verification is: <strong>${otp}</strong></p>
          <p>This OTP will expire in 5 minutes.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
        `,
      });
    }

    // In a real implementation, you would send SMS for phone verification
    // For now, we'll just log it
    if (phone) {
      console.log(`OTP for ${phone}: ${otp}`);
      // Implement SMS sending logic here
    }

    res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${email || phone}`,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ message: "Identifier and OTP are required" });
    }

    // Check if OTP exists and is valid
    const storedOTP = otpStore[identifier];
    if (!storedOTP) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // Check if OTP is expired
    if (Date.now() > storedOTP.expiry) {
      delete otpStore[identifier];
      return res.status(400).json({ message: "OTP expired" });
    }

    // Check if OTP matches
    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid, delete it to prevent reuse
    delete otpStore[identifier];

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP", error: error.message });
  }
};