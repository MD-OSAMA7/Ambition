import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Initiative from "./models/Initiative.js";

dotenv.config();

const seedInitiatives = async () => {
  try {
    await connectDB();

    await Initiative.deleteMany({});

    await Initiative.insertMany([
      {
        title: "Ambition Classes",
        year: "Since 2016",
        subtitle: "Competitive & Academic Excellence",
        points: [
          "Classes I – XII (Science & Arts)",
          "NEET | JEE | Foundation",
          "AMU | JMI | MU | BHU | S.C | B.Ed | D.El.Ed",
          "BPSC | Railway | Police | CTET | STET | More",
        ],
        logo: "/logo.svg",
        image: "/uploads/initiatives/initiative-school.jpg",
        order: 1,
      },

      {
        title: "Ambition Prestige School",
        year: "Since 2018",
        subtitle: "The School of Excellence",
        points: [
          "Pre-Nursery to Class VIII",
          "CBSE Curriculum",
          "English Medium",
          "Holistic & Creative Education",
        ],
        logo: "/logo.svg",
        image: "/uploads/initiatives/initiative-coaching.jpg",
        order: 2,
      },

      {
        title: "Ambition Educational & Welfare Trust",
        year: "Established 2026",
        subtitle: "Education · Welfare · Community",
        points: [
          "Supporting Education for All",
          "Scholarship Programs",
          "Career Guidance & Awareness",
          "Social Responsibility Initiatives",
        ],
        logo: "/logo.svg",
        image: "/uploads/initiatives/initiative-trust.jpg",
        order: 3,
      },
    ]);

    console.log("3 initiatives seeded successfully.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedInitiatives();