import express from "express";

import {
  appointment,
  checkout,
  paymentVerification,
  getAppointments,
  getAllPaymentsOfUser,
  sendOrderConfirmationEmail,
  bookAppointment,
  paymentSuccess,
  sendAppointmentEmailNew,
} from "../controllers/payment.controller.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Welcome to Home page");
});
router.route("/checkout").post(checkout);
router.get("/appointment", (req, res) => {
  res.send("Welcome to appointment page");
});
router.route("/appointment").post(appointment);
router.route("/paymentverification").post(paymentVerification);

router.get("/all-appointment-of-users", getAppointments);
router.get("/get-all-payments-of-users", getAllPaymentsOfUser);
router.post("/send-order-email", async (req, res) => {
  try {
    await sendOrderConfirmationEmail(req.body);
    res.status(200).json({ success: true, message: "Order confirmation emails sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send emails", error: error.message });
  }
});

router.post("/book-appointment", bookAppointment);
router.post("/payment-success", paymentSuccess);
router.post("/send-appointment-email", sendAppointmentEmailNew);


export default router;
