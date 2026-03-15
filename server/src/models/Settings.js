const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "general_seo",
    },
    siteName: {
      type: String,
      default: "MetaCode",
    },
    defaultTitle: {
      type: String,
      default: "MetaCode | Future Digital Solutions - Premium Tech Agency",
    },
    defaultDescription: {
      type: String,
      default: "MetaCode is a premium tech agency in India delivering web development, branding, and custom digital solutions for modern businesses.",
    },
    baseUrl: {
      type: String,
      default: "https://metacode.co.in",
    },
    defaultOgImage: {
      type: String,
      default: "https://metacode.co.in/logo.png",
    },
    twitterHandle: {
      type: String,
      default: "@metacode",
    },
    keywords: {
      type: [String],
      default: ["Tech Agency", "Web Development", "India", "MetaCode"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", SettingsSchema);
