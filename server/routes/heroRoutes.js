import express from "express";

import {
  getHero,
  getPublicHero,
  updateHeroImage,
} from "../controllers/heroController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/heroUpload.js";

const router = express.Router();

router.get("/public", getPublicHero);

router.get("/", authMiddleware, getHero);

router.put(
  "/image/:index",
  authMiddleware,
  upload.single("image"),
  updateHeroImage
);

export default router;