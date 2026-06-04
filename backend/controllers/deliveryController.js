const { readDB, writeDB } = require('../config/db');

// Get All Delivery Zones
const getAllDeliveryZones = async (req, res) => {
  try {
    const db = readDB();

    if (!db.deliveryZones) {
      return res.json({ success: true, deliveryZones: [] });
    }

    res.json({ success: true, deliveryZones: db.deliveryZones });
  } catch (error) {
    console.error("Get Delivery Zones Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Calculate Delivery Fee
const calculateDeliveryFee = async (req, res) => {
  try {
    const { zoneId, orderAmount } = req.body;

    if (!zoneId) {
      return res.json({ success: false, message: "Missing delivery zone ID" });
    }

    const db = readDB();

    if (!db.deliveryZones) {
      return res.json({ success: false, message: "No delivery zones configured" });
    }

    const zone = db.deliveryZones.find(z => z._id === zoneId);

    if (!zone) {
      return res.json({ success: false, message: "Delivery zone not found" });
    }

    // Calculate delivery fee based on zone
    let deliveryFee = zone.baseFee;

    // Add distance-based pricing (100 FCFA per km beyond base distance)
    const distanceSurcharge = Math.max(0, zone.distanceKm) * 100;
    deliveryFee += distanceSurcharge;

    // Free delivery for orders above certain threshold (e.g., 50000 FCFA)
    const freeDeliveryThreshold = 50000;
    let isFreeDelivery = false;

    if (orderAmount >= freeDeliveryThreshold) {
      deliveryFee = 0;
      isFreeDelivery = true;
    }

    res.json({
      success: true,
      deliveryFee,
      zoneName: zone.name,
      isFreeDelivery,
      freeDeliveryThreshold
    });
  } catch (error) {
    console.error("Calculate Delivery Fee Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Create Delivery Zone (Admin)
const createDeliveryZone = async (req, res) => {
  try {
    const { name, areas, baseFee, distanceKm, description } = req.body;

    if (!name || !baseFee) {
      return res.json({ success: false, message: "Missing required zone fields" });
    }

    const db = readDB();

    // Initialize deliveryZones array if it doesn't exist
    if (!db.deliveryZones) {
      db.deliveryZones = [];
    }

    const newZone = {
      _id: `zone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      areas: areas || [],
      baseFee: Number(baseFee),
      distanceKm: Number(distanceKm) || 0,
      description: description || ""
    };

    db.deliveryZones.push(newZone);
    writeDB(db);

    res.json({ success: true, message: "Delivery zone created successfully", zone: newZone });
  } catch (error) {
    console.error("Create Delivery Zone Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Update Delivery Zone (Admin)
const updateDeliveryZone = async (req, res) => {
  try {
    const { id, name, areas, baseFee, distanceKm, description } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Missing zone ID" });
    }

    const db = readDB();

    if (!db.deliveryZones) {
      return res.json({ success: false, message: "No delivery zones found" });
    }

    const zoneIndex = db.deliveryZones.findIndex(z => z._id === id);

    if (zoneIndex === -1) {
      return res.json({ success: false, message: "Delivery zone not found" });
    }

    // Update only provided fields
    if (name) db.deliveryZones[zoneIndex].name = name;
    if (areas !== undefined) db.deliveryZones[zoneIndex].areas = areas;
    if (baseFee !== undefined) db.deliveryZones[zoneIndex].baseFee = Number(baseFee);
    if (distanceKm !== undefined) db.deliveryZones[zoneIndex].distanceKm = Number(distanceKm);
    if (description !== undefined) db.deliveryZones[zoneIndex].description = description;

    writeDB(db);

    res.json({ success: true, message: "Delivery zone updated successfully", zone: db.deliveryZones[zoneIndex] });
  } catch (error) {
    console.error("Update Delivery Zone Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Delete Delivery Zone (Admin)
const deleteDeliveryZone = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Missing zone ID" });
    }

    const db = readDB();

    if (!db.deliveryZones) {
      return res.json({ success: false, message: "No delivery zones found" });
    }

    const zoneIndex = db.deliveryZones.findIndex(z => z._id === id);

    if (zoneIndex === -1) {
      return res.json({ success: false, message: "Delivery zone not found" });
    }

    db.deliveryZones.splice(zoneIndex, 1);
    writeDB(db);

    res.json({ success: true, message: "Delivery zone deleted successfully" });
  } catch (error) {
    console.error("Delete Delivery Zone Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllDeliveryZones,
  calculateDeliveryFee,
  createDeliveryZone,
  updateDeliveryZone,
  deleteDeliveryZone
};
