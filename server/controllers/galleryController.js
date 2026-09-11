import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
    });
  }
};

export const getPublicGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error("Get public gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery",
    });
  }
};

export const createGallery = async (req, res) => {
  try {
    const { title, order } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gallery image is required",
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ambition-classes/gallery",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    const gallery = await Gallery.create({
      title: title.trim(),
      image: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully",
      gallery,
    });
  } catch (error) {
    console.error("Create gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload gallery image",
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, order } = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    gallery.title = title?.trim() || gallery.title;
    gallery.order = Number(order) || 0;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ambition-classes/gallery",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      // Delete old Cloudinary image
      if (gallery.publicId) {
        try {
          await cloudinary.uploader.destroy(gallery.publicId);
        } catch (deleteError) {
          console.error(
            "Old Cloudinary image delete error:",
            deleteError.message
          );
        }
      }

      gallery.image = uploadResult.secure_url;
      gallery.publicId = uploadResult.public_id;
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      gallery,
    });
  } catch (error) {
    console.error("Update gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update gallery",
    });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found",
      });
    }

    // Delete image from Cloudinary
    if (gallery.publicId) {
      try {
        await cloudinary.uploader.destroy(gallery.publicId);
      } catch (deleteError) {
        console.error(
          "Cloudinary delete error:",
          deleteError.message
        );
      }
    }

    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete gallery",
    });
  }
};