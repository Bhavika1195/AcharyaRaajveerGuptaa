import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const testEmail = async () => {
  try {
    console.log("Testing email configuration...");
    console.log("Email User:", process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL);
    console.log("Email Pass:", process.env.VITE_APP_GOOGLE_APP_PASSWORD ? "***" : "NOT SET");

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: "bhavikasmart15@gmail.com",
        pass: "vtcm xkpw jsqk lyfx",
      },
    });

    // Test email
    const mailOptions = {
      from: "bhavikasmart15@gmail.com",
      to: "bhavikasmart15@gmail.com",
      subject: "Test Email - Appointment System",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the appointment booking system.</p>
        <p>If you receive this, the email configuration is working correctly.</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully:", result.messageId);
  } catch (error) {
    console.error("Email test failed:", error);
  }
};

testEmail();