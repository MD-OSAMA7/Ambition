import mongoose from "mongoose";

const brochureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Ambition Classes Brochure",
      trim: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brochure = mongoose.model(
  "Brochure",
  brochureSchema
);

export default Brochure;