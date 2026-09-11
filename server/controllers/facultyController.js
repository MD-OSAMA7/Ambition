import Faculty from "../models/Faculty.js";
import cloudinary from "../config/cloudinary.js";

/* =========================================
   GET ALL FACULTY - ADMIN
========================================= */
export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    console.error("Get faculty error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty",
      error: error.message,
    });
  }
};

/* =========================================
   GET FACULTY - PUBLIC
========================================= */
export const getPublicFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    console.error("Get public faculty error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public faculty",
      error: error.message,
    });
  }
};

/* =========================================
   CREATE FACULTY
========================================= */
export const createFaculty = async (req, res) => {
  try {
    const { name, subject, order } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Faculty name is required",
      });
    }

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Faculty image is required",
      });
    }

    /* =========================================
       UPLOAD IMAGE TO CLOUDINARY
    ========================================= */
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "ambition-classes/faculty",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error(
              "Cloudinary faculty upload error:",
              error
            );

            reject(error);
            return;
          }

          resolve(result);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    /* =========================================
       SAVE FACULTY TO MONGODB
    ========================================= */
    const faculty = await Faculty.create({
      name: name.trim(),
      subject: subject.trim(),
      image: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      faculty,
    });
  } catch (error) {
    console.error("Create faculty error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create faculty",
      error: error.message,
    });
  }
};

/* =========================================
   UPDATE FACULTY
========================================= */
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subject, order } = req.body;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Faculty name is required",
      });
    }

    if (!subject?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subject is required",
      });
    }

    faculty.name = name.trim();
    faculty.subject = subject.trim();
    faculty.order = Number(order) || 0;

    /* =========================================
       NEW IMAGE SELECTED
    ========================================= */
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "ambition-classes/faculty",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error(
                "Cloudinary faculty update error:",
                error
              );

              reject(error);
              return;
            }

            resolve(result);
          }
        );

        uploadStream.end(req.file.buffer);
      });

      /* =========================================
         DELETE OLD CLOUDINARY IMAGE
      ========================================= */
      if (faculty.publicId) {
        try {
          await cloudinary.uploader.destroy(
            faculty.publicId
          );
        } catch (error) {
          console.error(
            "Old faculty image delete error:",
            error.message
          );
        }
      }

      faculty.image = uploadResult.secure_url;
      faculty.publicId = uploadResult.public_id;
    }

    await faculty.save();

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      faculty,
    });
  } catch (error) {
    console.error("Update faculty error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update faculty",
      error: error.message,
    });
  }
};

/* =========================================
   DELETE FACULTY
========================================= */
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    /* =========================================
       DELETE IMAGE FROM CLOUDINARY
    ========================================= */
    if (faculty.publicId) {
      try {
        await cloudinary.uploader.destroy(
          faculty.publicId
        );
      } catch (error) {
        console.error(
          "Cloudinary faculty delete error:",
          error.message
        );
      }
    }

    await faculty.deleteOne();

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error("Delete faculty error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete faculty",
      error: error.message,
    });
  }
};