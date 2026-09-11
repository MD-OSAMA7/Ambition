import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Public
router.get("/public", getEvents);

// Admin protected
router.use(authMiddleware);

router.get("/", getEvents);

router.post("/", createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;