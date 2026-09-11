import express from "express";

import {
  getNews,
  getPublicNews,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTE
// Homepage ke liye
// ==========================================
router.get("/public", getPublicNews);

// ==========================================
// ADMIN ROUTES
// ==========================================
router.get("/", authMiddleware, getNews);

router.post("/", authMiddleware, createNews);

router.put("/:id", authMiddleware, updateNews);

router.delete("/:id", authMiddleware, deleteNews);

export default router;