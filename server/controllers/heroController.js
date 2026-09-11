import Hero from "../models/Hero.js";
import cloudinary from "../config/cloudinary.js";

/* =========================================
   HELPER
   Convert old string image into object
========================================= */
const normalizeImage = (image) => {
  if (!image) return null;

  // Old image format
  if (typeof image === "string") {
    return {
      url: image,
      publicId: "",
    };
  }

  // New Cloudinary format
  if (typeof image === "object") {
    return {
      url: image.url || "",
      publicId: image.publicId || "",
    };
  }

  return null;
};

/* =========================================
   NORMALIZE HERO
========================================= */
const normalizeHero = (hero) => {
  if (!hero) {
    return null;
  }

  return {
    _id: hero._id,
    images: (hero.images || [])
      .map(normalizeImage)
      .filter(Boolean),
  };
};

/* =========================================
   GET HERO - ADMIN
========================================= */
export const getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({
        images: [],
      });
    }

    res.status(200).json({
      success: true,
      hero: normalizeHero(hero),
    });
  } catch (error) {
    console.error("Get hero error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hero",
      error: error.message,
    });
  }
};

/* =========================================
   GET HERO - PUBLIC
========================================= */
export const getPublicHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({
        images: [],
      });
    }

    res.status(200).json({
      success: true,
      hero: normalizeHero(hero),
    });
  } catch (error) {
    console.error("Get public hero error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public hero",
      error: error.message,
    });
  }
};

/* =========================================
   UPDATE ONE HERO IMAGE
========================================= */
export const updateHeroImage = async (req, res) => {
  try {
    const imageIndex = Number(req.params.index);

    if (
      Number.isNaN(imageIndex) ||
      imageIndex < 0 ||
      imageIndex > 3
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid hero image index",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hero image is required",
      });
    }

    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({
        images: [],
      });
    }

    /* =========================================
       UPLOAD TO CLOUDINARY
    ========================================= */
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ambition-classes/hero",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary hero upload error:", error);
            reject(error);
            return;
          }

          resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    /* =========================================
       OLD IMAGE
    ========================================= */
    const oldImage = normalizeImage(hero.images[imageIndex]);

    if (oldImage?.publicId) {
      try {
        await cloudinary.uploader.destroy(oldImage.publicId);
      } catch (error) {
        console.error(
          "Old hero image delete error:",
          error.message
        );
      }
    }

    /* =========================================
       SAVE NEW IMAGE
    ========================================= */
    hero.images[imageIndex] = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    await hero.save();

    res.status(200).json({
      success: true,
      message: "Hero image updated successfully",
      hero: normalizeHero(hero),
    });
  } catch (error) {
    console.error("Update hero image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update hero image",
      error: error.message,
    });
  }
};