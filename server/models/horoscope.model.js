import mongoose from "mongoose";

const horoscopeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Horoscope title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Horoscope slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "Horoscope content is required"],
    },
    zodiacSign: {
      type: String,
      required: [true, "Zodiac sign is required"],
      enum: [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
      ],
    },
    period: {
      type: String,
      required: [true, "Period is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Horoscope = mongoose.model("Horoscope", horoscopeSchema);