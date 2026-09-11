import Achievement from "../models/Achievement.js";

// =========================================
// GET ACHIEVEMENTS
// =========================================
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      achievements,
    });
  } catch (error) {
    console.error(
      "Get achievements error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// CREATE ACHIEVEMENT
// =========================================
const createAchievement = async (req, res) => {
  try {
    const {
      value,
      descriptionLine1,
      descriptionLine2,
      order,
    } = req.body;

    if (!value?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Achievement value is required",
      });
    }

    const achievement = await Achievement.create({
      value: value.trim(),

      descriptionLine1:
        descriptionLine1?.trim() || "",

      descriptionLine2:
        descriptionLine2?.trim() || "",

      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      achievement,
    });
  } catch (error) {
    console.error(
      "Create achievement error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// UPDATE ACHIEVEMENT
// =========================================
const updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement =
      await Achievement.findByIdAndUpdate(
        id,
        {
          value: req.body.value?.trim(),

          descriptionLine1:
            req.body.descriptionLine1?.trim() || "",

          descriptionLine2:
            req.body.descriptionLine2?.trim() || "",

          order: Number(req.body.order) || 0,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      achievement,
    });
  } catch (error) {
    console.error(
      "Update achievement error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// DELETE ACHIEVEMENT
// =========================================
const deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    const achievement =
      await Achievement.findByIdAndDelete(id);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete achievement error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
};