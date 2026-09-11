import Event from "../models/Event.js";

// =========================================
// GET EVENTS
// =========================================
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Get events error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// CREATE EVENT
// =========================================
const createEvent = async (req, res) => {
  try {
    const {
      date,
      title,
      subtitle,
      order,
    } = req.body;

    if (!date?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Event date is required",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Event title is required",
      });
    }

    const event = await Event.create({
      date: date.trim(),
      title: title.trim(),
      subtitle: subtitle?.trim() || "",
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// UPDATE EVENT
// =========================================
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (req.body.date !== undefined) {
      event.date = req.body.date.trim();
    }

    if (req.body.title !== undefined) {
      event.title = req.body.title.trim();
    }

    if (req.body.subtitle !== undefined) {
      event.subtitle = req.body.subtitle.trim();
    }

    if (req.body.order !== undefined) {
      event.order = Number(req.body.order) || 0;
    }

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update event error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// DELETE EVENT
// =========================================
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};