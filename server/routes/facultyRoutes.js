import express from "express";

import {
  getFaculty,
  getPublicFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "../controllers/facultyController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/facultyUpload.js";

const router = express.Router();

// Public faculty data
router.get("/public", getPublicFaculty);

// Admin faculty data
router.get("/", authMiddleware, getFaculty);

// Add faculty
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createFaculty
);

// Update faculty
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateFaculty
);

// Delete faculty
router.delete(
  "/:id",
  authMiddleware,
  deleteFaculty
);

export default router;