const Settings = require("../models/Settings");

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: "general_seo" });
    if (!settings) {
      settings = await Settings.create({ key: "general_seo" });
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { key: "general_seo" },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, settings, message: "SEO Settings updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
