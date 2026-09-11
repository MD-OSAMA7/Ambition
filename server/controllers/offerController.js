import Offer from "../models/Offer.js";

// =========================================
// GET ALL OFFERS - ADMIN
// =========================================
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      offers,
    });
  } catch (error) {
    console.error("Get offers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch offers",
    });
  }
};

// =========================================
// GET ACTIVE OFFERS - PUBLIC
// =========================================
export const getPublicOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      offers,
    });
  } catch (error) {
    console.error("Get public offers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public offers",
    });
  }
};

// =========================================
// CREATE OFFER
// =========================================
export const createOffer = async (req, res) => {
  try {
    const { title, description, active } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Offer title is required",
      });
    }

    const offer = await Offer.create({
      title: title.trim(),
      description: description?.trim() || "",
      active: active !== false,
    });

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    console.error("Create offer error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create offer",
    });
  }
};

// =========================================
// UPDATE OFFER
// =========================================
export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, active } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Offer title is required",
      });
    }

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    offer.title = title.trim();
    offer.description = description?.trim() || "";
    offer.active = active !== false;

    // Keep old field updated too
    offer.text = title.trim();

    await offer.save();

    res.json({
      success: true,
      message: "Offer updated successfully",
      offer,
    });
  } catch (error) {
    console.error("Update offer error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update offer",
    });
  }
};

// =========================================
// TOGGLE OFFER
// =========================================
export const toggleOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    offer.active = !offer.active;

    await offer.save();

    res.json({
      success: true,
      message: offer.active
        ? "Offer activated successfully"
        : "Offer deactivated successfully",
      offer,
    });
  } catch (error) {
    console.error("Toggle offer error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to toggle offer",
    });
  }
};

// =========================================
// DELETE OFFER
// =========================================
export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    await offer.deleteOne();

    res.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    console.error("Delete offer error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete offer",
    });
  }
};