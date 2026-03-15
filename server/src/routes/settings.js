const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { protect, authorize } = require("../middleware/auth");

// Public route to get SEO settings
router.get("/", getSettings);

// Admin only route to update SEO settings
router.put("/", protect, authorize("admin"), updateSettings);

module.exports = router;
