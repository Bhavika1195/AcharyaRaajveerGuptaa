import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    preferredSlot: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    modeOfConsultation: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    expertName: {
      type: String,
      required: true,
    },
    expertEmail: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
    },
    razorpay_payment_id: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    currentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);

// {
//   "firstName": "Pablo",
//    "lastName": "Rolex",
//    "mobileNumber": 1234567890,
//    "email": "pablo@site.dev",
//    "address": "UK",
//    "date": "12/02/23",
//    "time": "12:00",
//    "preferredSlot": "morning",
//    "modeOfConsultation": "online"
// }
