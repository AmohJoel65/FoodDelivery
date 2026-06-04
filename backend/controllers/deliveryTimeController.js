const { readDB, writeDB } = require('../config/db');

// Get All Delivery Time Slots
const getAllTimeSlots = async (req, res) => {
  try {
    const db = readDB();

    if (!db.deliveryTimeSlots) {
      return res.json({ success: true, timeSlots: [] });
    }

    // Filter only active slots
    const activeSlots = db.deliveryTimeSlots.filter(slot => slot.isActive);

    res.json({ success: true, timeSlots: activeSlots });
  } catch (error) {
    console.error("Get Time Slots Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Get Available Time Slots for a Specific Date
const getAvailableTimeSlots = async (req, res) => {
  try {
    const { date } = req.query;

    const db = readDB();

    if (!db.deliveryTimeSlots) {
      return res.json({ success: true, timeSlots: [] });
    }

    // Filter only active slots
    const activeSlots = db.deliveryTimeSlots.filter(slot => slot.isActive);

    // In a real implementation, you would check existing orders for the date
    // and mark slots as unavailable if they're at capacity
    // For now, return all active slots as available

    res.json({ success: true, timeSlots: activeSlots, date });
  } catch (error) {
    console.error("Get Available Time Slots Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Create Time Slot (Admin)
const createTimeSlot = async (req, res) => {
  try {
    const { name, startTime, endTime, description } = req.body;

    if (!name || !startTime || !endTime) {
      return res.json({ success: false, message: "Missing required time slot fields" });
    }

    const db = readDB();

    // Initialize deliveryTimeSlots array if it doesn't exist
    if (!db.deliveryTimeSlots) {
      db.deliveryTimeSlots = [];
    }

    const newSlot = {
      _id: `slot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      startTime,
      endTime,
      isActive: true,
      description: description || ""
    };

    db.deliveryTimeSlots.push(newSlot);
    writeDB(db);

    res.json({ success: true, message: "Time slot created successfully", slot: newSlot });
  } catch (error) {
    console.error("Create Time Slot Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Update Time Slot (Admin)
const updateTimeSlot = async (req, res) => {
  try {
    const { id, name, startTime, endTime, isActive, description } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Missing slot ID" });
    }

    const db = readDB();

    if (!db.deliveryTimeSlots) {
      return res.json({ success: false, message: "No time slots found" });
    }

    const slotIndex = db.deliveryTimeSlots.findIndex(s => s._id === id);

    if (slotIndex === -1) {
      return res.json({ success: false, message: "Time slot not found" });
    }

    // Update only provided fields
    if (name) db.deliveryTimeSlots[slotIndex].name = name;
    if (startTime) db.deliveryTimeSlots[slotIndex].startTime = startTime;
    if (endTime) db.deliveryTimeSlots[slotIndex].endTime = endTime;
    if (isActive !== undefined) db.deliveryTimeSlots[slotIndex].isActive = isActive;
    if (description !== undefined) db.deliveryTimeSlots[slotIndex].description = description;

    writeDB(db);

    res.json({ success: true, message: "Time slot updated successfully", slot: db.deliveryTimeSlots[slotIndex] });
  } catch (error) {
    console.error("Update Time Slot Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Delete Time Slot (Admin)
const deleteTimeSlot = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Missing slot ID" });
    }

    const db = readDB();

    if (!db.deliveryTimeSlots) {
      return res.json({ success: false, message: "No time slots found" });
    }

    const slotIndex = db.deliveryTimeSlots.findIndex(s => s._id === id);

    if (slotIndex === -1) {
      return res.json({ success: false, message: "Time slot not found" });
    }

    db.deliveryTimeSlots.splice(slotIndex, 1);
    writeDB(db);

    res.json({ success: true, message: "Time slot deleted successfully" });
  } catch (error) {
    console.error("Delete Time Slot Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllTimeSlots,
  getAvailableTimeSlots,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot
};
