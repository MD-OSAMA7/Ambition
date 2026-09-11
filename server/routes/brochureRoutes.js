import express from "express";

import {
  getPublicBrochure,
  getBrochure,
  uploadBrochure,
  deleteBrochure,
} from "../controllers/brochureController.js";

import brochureUpload from "../config/brochureUpload.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC
// ==========================================
router.get(
  "/public",
  getPublicBrochure
);

// ==========================================
// ADMIN
// ==========================================
router.get(
  "/",
  authMiddleware,
  getBrochure
);

router.post(
  "/",
  authMiddleware,
  brochureUpload.single("brochure"),
  uploadBrochure
);

router.delete(
  "/",
  authMiddleware,
  deleteBrochure
);

export default router;