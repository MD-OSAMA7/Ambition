import Initiative from "../models/Initiative.js";

const getInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      initiatives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createInitiative = async (req, res) => {
  try {
    const {
      title,
      year,
      subtitle,
      points,
      order,
    } = req.body;

    if (!title?.trim() || !year?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and year are required",
      });
    }

    let parsedPoints = [];

    if (points) {
      try {
        parsedPoints = JSON.parse(points);
      } catch {
        parsedPoints = String(points)
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    const logo = req.files?.logo?.[0]
      ? `/uploads/initiatives/${req.files.logo[0].filename}`
      : "";

    const image = req.files?.image?.[0]
      ? `/uploads/initiatives/${req.files.image[0].filename}`
      : "";

    const initiative = await Initiative.create({
      logo,
      title,
      year,
      subtitle,
      points: parsedPoints,
      image,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Initiative created successfully",
      initiative,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInitiative = async (req, res) => {
  try {
    const { id } = req.params;

    const initiative = await Initiative.findById(id);

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    initiative.title =
      req.body.title ?? initiative.title;

    initiative.year =
      req.body.year ?? initiative.year;

    initiative.subtitle =
      req.body.subtitle ?? initiative.subtitle;

    initiative.order =
      req.body.order !== undefined
        ? Number(req.body.order)
        : initiative.order;

    if (req.body.points !== undefined) {
      try {
        initiative.points = JSON.parse(req.body.points);
      } catch {
        initiative.points = String(req.body.points)
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    if (req.files?.logo?.[0]) {
      initiative.logo = `/uploads/initiatives/${req.files.logo[0].filename}`;
    }

    if (req.files?.image?.[0]) {
      initiative.image = `/uploads/initiatives/${req.files.image[0].filename}`;
    }

    await initiative.save();

    res.status(200).json({
      success: true,
      message: "Initiative updated successfully",
      initiative,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteInitiative = async (req, res) => {
  try {
    const { id } = req.params;

    const initiative =
      await Initiative.findByIdAndDelete(id);

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Initiative deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getInitiatives,
  createInitiative,
  updateInitiative,
  deleteInitiative,
};