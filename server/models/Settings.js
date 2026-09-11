import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      default: "Ranibagh, Bakhtiyarpur, Saharsa (Bihar) - 852127",
      trim: true,
    },

    mapUrl: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "+91 99550 53555",
      trim: true,
    },

    email: {
      type: String,
      default: "info@ambitionclasses.org",
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    youtube: {
      type: String,
      default: "",
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;