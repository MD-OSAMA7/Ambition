import express from "express";

import {
  getGallery,
  getPublicGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/galleryUpload.js";

const router = express.Router();

router.get("/public", getPublicGallery);

router.get("/", authMiddleware, getGallery);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createGallery
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateGallery
);

router.delete("/:id", authMiddleware, deleteGallery);

export default router;