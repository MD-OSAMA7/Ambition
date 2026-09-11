import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    images: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Hero = mongoose.model("Hero", heroSchema);

export default Hero;