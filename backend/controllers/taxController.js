const { readDB, writeDB } = require('../config/db');

// Get Tax Configuration
const getTaxConfig = async (req, res) => {
  try {
    const db = readDB();

    if (!db.taxConfig) {
      return res.json({ success: true, taxConfig: null });
    }

    res.json({ success: true, taxConfig: db.taxConfig });
  } catch (error) {
    console.error("Get Tax Config Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Calculate Tax
const calculateTax = async (req, res) => {
  try {
    const { foodAmount, deliveryFee } = req.body;

    const db = readDB();

    if (!db.taxConfig || !db.taxConfig.isActive) {
      // If tax is not configured or inactive, return 0 tax
      return res.json({
        success: true,
        taxAmount: 0,
        taxRate: 0,
        taxName: "No Tax"
      });
    }

    const taxConfig = db.taxConfig;
    let taxableAmount = 0;

    // Calculate taxable amount based on configuration
    if (taxConfig.appliesToFood && foodAmount) {
      taxableAmount += Number(foodAmount);
    }

    if (taxConfig.appliesToDelivery && deliveryFee) {
      taxableAmount += Number(deliveryFee);
    }

    const taxAmount = taxableAmount * taxConfig.taxRate;

    res.json({
      success: true,
      taxAmount: Math.round(taxAmount),
      taxRate: taxConfig.taxRate,
      taxName: taxConfig.taxName,
      taxableAmount
    });
  } catch (error) {
    console.error("Calculate Tax Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Update Tax Configuration (Admin)
const updateTaxConfig = async (req, res) => {
  try {
    const { taxRate, taxName, description, isActive, appliesToFood, appliesToDelivery } = req.body;

    const db = readDB();

    if (!db.taxConfig) {
      db.taxConfig = {
        _id: "tax_config_1"
      };
    }

    // Update only provided fields
    if (taxRate !== undefined) db.taxConfig.taxRate = Number(taxRate);
    if (taxName !== undefined) db.taxConfig.taxName = taxName;
    if (description !== undefined) db.taxConfig.description = description;
    if (isActive !== undefined) db.taxConfig.isActive = isActive;
    if (appliesToFood !== undefined) db.taxConfig.appliesToFood = appliesToFood;
    if (appliesToDelivery !== undefined) db.taxConfig.appliesToDelivery = appliesToDelivery;

    writeDB(db);

    res.json({ success: true, message: "Tax configuration updated successfully", taxConfig: db.taxConfig });
  } catch (error) {
    console.error("Update Tax Config Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getTaxConfig,
  calculateTax,
  updateTaxConfig
};
