import nodemailer from "nodemailer";

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
      pass: process.env.VITE_APP_GOOGLE_APP_PASSWORD,
    },
    debug: true, // show debug output
  });
};

// Send contact form
export const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please provide name, email, and message" });
    }

    console.log("Email credentials:", {
      user: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
      pass: process.env.VITE_APP_GOOGLE_APP_PASSWORD ? "[PROVIDED]" : "[MISSING]"
    });

    // Create a simpler email message
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Use a simpler approach with a single email
    const transporter = createTransporter();
    
    // Verify transporter connection
    transporter.verify(function(error, success) {
      if (error) {
        console.error("Transporter verification error:", error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const mailOptions = {
      from: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
      to: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
      cc: email, // Send a copy to the user
      subject: `Contact Form: ${subject || "New Message"}`,
      html: emailContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    console.error("Contact email error:", error);
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};