import express from "express";

import {
  getSettings,
  getPublicSettings,
  updateSettings,
} from "../controllers/settingsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public website settings
router.get("/public", getPublicSettings);

// Admin settings
router.get("/", authMiddleware, getSettings);

router.put("/", authMiddleware, updateSettings);

export default router;