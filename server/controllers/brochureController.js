import Brochure from "../models/Brochure.js";
import fs from "fs";

// ==========================================
// GET PUBLIC BROCHURE
// ==========================================
export const getPublicBrochure = async (req, res) => {
  try {
    const brochure = await Brochure.findOne()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      brochure,
    });
  } catch (error) {
    console.error(
      "Get public brochure error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch brochure",
    });
  }
};

// ==========================================
// GET BROCHURE - ADMIN
// ==========================================
export const getBrochure = async (req, res) => {
  try {
    const brochure = await Brochure.findOne()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      brochure,
    });
  } catch (error) {
    console.error(
      "Get brochure error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch brochure",
    });
  }
};

// ==========================================
// UPLOAD BROCHURE
// ==========================================
export const uploadBrochure = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF brochure.",
      });
    }

    const oldBrochures = await Brochure.find();

    for (const oldBrochure of oldBrochures) {
      const oldFilePath = oldBrochure.fileUrl
        .replace("/uploads/", "");

      const fullPath = `uploads/${oldFilePath}`;

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await Brochure.deleteMany({});

    const brochure = await Brochure.create({
      title:
        req.body.title?.trim() ||
        "Ambition Classes Brochure",

      fileName: req.file.originalname,

      fileUrl: `/uploads/brochure/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Brochure uploaded successfully",
      brochure,
    });
  } catch (error) {
    console.error(
      "Upload brochure error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to upload brochure",
    });
  }
};

// ==========================================
// DELETE BROCHURE
// ==========================================
export const deleteBrochure = async (req, res) => {
  try {
    const brochure = await Brochure.findOne();

    if (!brochure) {
      return res.status(404).json({
        success: false,
        message: "Brochure not found",
      });
    }

    const relativePath = brochure.fileUrl.replace(
      "/uploads/",
      ""
    );

    const fullPath = `uploads/${relativePath}`;

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    await Brochure.deleteOne({
      _id: brochure._id,
    });

    res.status(200).json({
      success: true,
      message: "Brochure deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete brochure error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete brochure",
    });
  }
};