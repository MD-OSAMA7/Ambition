import Settings from "../models/Settings.js";

// =========================================
// GET SETTINGS - ADMIN
// =========================================
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};

// =========================================
// GET SETTINGS - PUBLIC
// =========================================
export const getPublicSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get public settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public settings",
    });
  }
};

// =========================================
// UPDATE SETTINGS
// =========================================
export const updateSettings = async (req, res) => {
  try {
    const {
      address,
      mapUrl,
      phone,
      email,
      facebook,
      youtube,
      instagram,
      linkedin,
    } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    settings.address = address?.trim() || "";
    settings.mapUrl = mapUrl?.trim() || "";
    settings.phone = phone?.trim() || "";
    settings.email = email?.trim() || "";

    settings.facebook = facebook?.trim() || "";
    settings.youtube = youtube?.trim() || "";
    settings.instagram = instagram?.trim() || "";
    settings.linkedin = linkedin?.trim() || "";

    await settings.save();

    res.json({
      success: true,
      message: "Website settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};