const { readDB, writeDB } = require('../config/db');

// Create Coupon
const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, maxDiscountAmount, expiryDate, usageLimit, isActive } = req.body;

    if (!code || !discountType || !discountValue) {
      return res.json({ success: false, message: "Missing required coupon fields" });
    }

    if (discountType !== "percentage" && discountType !== "fixed") {
      return res.json({ success: false, message: "Discount type must be 'percentage' or 'fixed'" });
    }

    const db = readDB();

    // Initialize coupons array if it doesn't exist
    if (!db.coupons) {
      db.coupons = [];
    }

    // Check if coupon code already exists
    const existingCoupon = db.coupons.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (existingCoupon) {
      return res.json({ success: false, message: "Coupon code already exists" });
    }

    const newCoupon = {
      _id: `coupon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      code: code.toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: minOrderAmount ? Number(minOrderAmount) : 0,
      maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
      expiryDate: expiryDate || null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      usageCount: 0,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString()
    };

    db.coupons.push(newCoupon);
    writeDB(db);

    res.json({ success: true, message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    console.error("Create Coupon Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Get All Coupons (Admin)
const getAllCoupons = async (req, res) => {
  try {
    const db = readDB();

    if (!db.coupons) {
      return res.json({ success: true, coupons: [] });
    }

    // Sort by creation date (newest first)
    const sortedCoupons = db.coupons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ success: true, coupons: sortedCoupons });
  } catch (error) {
    console.error("Get All Coupons Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Validate Coupon
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code) {
      return res.json({ success: false, message: "Missing coupon code" });
    }

    const db = readDB();

    if (!db.coupons) {
      return res.json({ success: false, message: "Coupon not found" });
    }

    const coupon = db.coupons.find(c => c.code.toLowerCase() === code.toLowerCase());

    if (!coupon) {
      return res.json({ success: false, message: "Invalid coupon code" });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.json({ success: false, message: "This coupon is not active" });
    }

    // Check if coupon has expired
    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.json({ success: false, message: "This coupon has expired" });
    }

    // Check if usage limit has been reached
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.json({ success: false, message: "This coupon has reached its usage limit" });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
      return res.json({ 
        success: false, 
        message: `Minimum order amount of ${coupon.minOrderAmount} FCFA required` 
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = (orderAmount * coupon.discountValue) / 100;
      // Apply max discount limit if set
      if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    res.json({
      success: true,
      message: "Coupon applied successfully",
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discountAmount
      }
    });
  } catch (error) {
    console.error("Validate Coupon Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Update Coupon
const updateCoupon = async (req, res) => {
  try {
    const { id, code, discountType, discountValue, minOrderAmount, maxDiscountAmount, expiryDate, usageLimit, isActive } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Missing coupon ID" });
    }

    const db = readDB();
    const couponIndex = db.coupons.findIndex(c => c._id === id);

    if (couponIndex === -1) {
      return res.json({ success: false, message: "Coupon not found" });
    }

    // Update only provided fields
    if (code) db.coupons[couponIndex].code = code.toUpperCase();
    if (discountType) db.coupons[couponIndex].discountType = discountType;
    if (discountValue !== undefined) db.coupons[couponIndex].discountValue = Number(discountValue);
    if (minOrderAmount !== undefined) db.coupons[couponIndex].minOrderAmount = Number(minOrderAmount);
    if (maxDiscountAmount !== undefined) db.coupons[couponIndex].maxDiscountAmount = Number(maxDiscountAmount);
    if (expiryDate !== undefined) db.coupons[couponIndex].expiryDate = expiryDate;
    if (usageLimit !== undefined) db.coupons[couponIndex].usageLimit = Number(usageLimit);
    if (isActive !== undefined) db.coupons[couponIndex].isActive = isActive;

    writeDB(db);

    res.json({ success: true, message: "Coupon updated successfully", coupon: db.coupons[couponIndex] });
  } catch (error) {
    console.error("Update Coupon Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, message: "Missing coupon ID" });
    }

    const db = readDB();

    if (!db.coupons) {
      return res.json({ success: false, message: "No coupons found" });
    }

    const couponIndex = db.coupons.findIndex(c => c._id === id);

    if (couponIndex === -1) {
      return res.json({ success: false, message: "Coupon not found" });
    }

    db.coupons.splice(couponIndex, 1);
    writeDB(db);

    res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Delete Coupon Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Increment Coupon Usage
const incrementCouponUsage = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.json({ success: false, message: "Missing coupon code" });
    }

    const db = readDB();

    if (!db.coupons) {
      return res.json({ success: false, message: "No coupons found" });
    }

    const couponIndex = db.coupons.findIndex(c => c.code.toLowerCase() === code.toLowerCase());

    if (couponIndex === -1) {
      return res.json({ success: false, message: "Coupon not found" });
    }

    db.coupons[couponIndex].usageCount = (db.coupons[couponIndex].usageCount || 0) + 1;
    writeDB(db);

    res.json({ success: true, message: "Coupon usage incremented" });
  } catch (error) {
    console.error("Increment Coupon Usage Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
  incrementCouponUsage
};
