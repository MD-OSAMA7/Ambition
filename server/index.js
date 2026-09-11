import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import offerRoutes from "./routes/offerRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import initiativeRoutes from "./routes/initiativeRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import brochureRoutes from "./routes/brochureRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* Database */
connectDB();

/* Middleware */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/initiatives", initiativeRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/events", eventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/brochure", brochureRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", settingsRoutes);

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Ambition Classes API is running",
  });
});

app.get("/api/auth/verify", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    admin: req.admin,
  });
});

/* Server */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
