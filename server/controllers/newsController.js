import News from "../models/News.js";

// ==========================================
// GET ALL NEWS - ADMIN
// ==========================================
export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({
      order: 1,
      date: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    console.error("Get news error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch news",
    });
  }
};

// ==========================================
// GET PUBLIC NEWS - HOMEPAGE
// ==========================================
export const getPublicNews = async (req, res) => {
  try {
    const news = await News.find().sort({
      order: 1,
      date: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    console.error("Get public news error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public news",
    });
  }
};

// ==========================================
// CREATE NEWS
// ==========================================
export const createNews = async (req, res) => {
  try {
    const {
      date,
      title,
      subtitle,
      isNew,
      order,
    } = req.body;

    if (!date || !title?.trim() || !subtitle?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Date, title and subtitle are required",
      });
    }

    const news = await News.create({
      date,
      title: title.trim(),
      subtitle: subtitle.trim(),
      isNew: isNew === true || isNew === "true",
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      news,
    });
  } catch (error) {
    console.error("Create news error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create news",
    });
  }
};

// ==========================================
// UPDATE NEWS
// ==========================================
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      date,
      title,
      subtitle,
      isNew,
      order,
    } = req.body;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    news.date = date;
    news.title = title?.trim() || "";
    news.subtitle = subtitle?.trim() || "";
    news.isNew = isNew === true || isNew === "true";
    news.order = Number(order) || 0;

    await news.save();

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    console.error("Update news error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update news",
    });
  }
};

// ==========================================
// DELETE NEWS
// ==========================================
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    await news.deleteOne();

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Delete news error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete news",
    });
  }
};