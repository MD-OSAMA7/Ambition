import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/initiativeUpload.js";

import {
  getInitiatives,
  createInitiative,
  updateInitiative,
  deleteInitiative,
} from "../controllers/initiativeController.js";

const router = express.Router();

router.get("/public", getInitiatives);

router.use(authMiddleware);

router.get("/", getInitiatives);

router.post(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createInitiative
);

router.put(
  "/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  updateInitiative
);

router.delete("/:id", deleteInitiative);

export default router;