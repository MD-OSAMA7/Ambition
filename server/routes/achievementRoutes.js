import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

// Public
router.get("/public", getAchievements);

// Admin protected routes
router.use(authMiddleware);

router.get("/", getAchievements);

router.post("/", createAchievement);

router.put("/:id", updateAchievement);

router.delete("/:id", deleteAchievement);

export default router;