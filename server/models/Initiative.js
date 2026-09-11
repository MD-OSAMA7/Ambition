import mongoose from "mongoose";

const initiativeSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    points: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Initiative = mongoose.model(
  "Initiative",
  initiativeSchema
);

export default Initiative;