import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getOffers,
  getPublicOffers,
  createOffer,
  updateOffer,
  toggleOffer,
  deleteOffer,
} from "../controllers/offerController.js";

const router = express.Router();

/*
  Public route
  No login required
*/
router.get("/public", getPublicOffers);

/*
  Admin routes
  Login required
*/
router.use(authMiddleware);

router.get("/", getOffers);

router.post("/", createOffer);

router.put("/:id", updateOffer);

router.patch("/:id/toggle", toggleOffer);

router.delete("/:id", deleteOffer);

export default router;