const { readDB, writeDB } = require('../config/db');

// Request Refund
const requestRefund = async (req, res) => {
  try {
    const { orderId, userId, reason } = req.body;

    if (!orderId || !userId) {
      return res.json({ success: false, message: "Missing order ID or user ID" });
    }

    const db = readDB();

    const orderIndex = db.orders.findIndex(o => o._id === orderId);

    if (orderIndex === -1) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Check if order belongs to user
    if (db.orders[orderIndex].userId !== userId) {
      return res.json({ success: false, message: "Unauthorized to request refund for this order" });
    }

    // Check if order is eligible for refund (delivered orders only)
    if (db.orders[orderIndex].status !== "Delivered") {
      return res.json({ success: false, message: "Order must be delivered to request a refund" });
    }

    // Check if refund already exists
    if (!db.refunds) {
      db.refunds = [];
    }

    const existingRefund = db.refunds.find(r => r.orderId === orderId);
    if (existingRefund) {
      return res.json({ success: false, message: "Refund already requested for this order" });
    }

    // Create refund request
    const newRefund = {
      _id: `refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      orderId,
      userId,
      amount: db.orders[orderIndex].amount,
      reason: reason || "Customer requested refund",
      status: "Pending",
      requestedAt: new Date().toISOString(),
      processedAt: null,
      processedBy: null
    };

    db.refunds.push(newRefund);
    writeDB(db);

    res.json({ success: true, message: "Refund request submitted successfully", refund: newRefund });
  } catch (error) {
    console.error("Request Refund Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Get All Refunds (Admin)
const getAllRefunds = async (req, res) => {
  try {
    const db = readDB();

    if (!db.refunds) {
      return res.json({ success: true, refunds: [] });
    }

    // Sort by request date (newest first)
    const sortedRefunds = db.refunds.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));

    res.json({ success: true, refunds: sortedRefunds });
  } catch (error) {
    console.error("Get All Refunds Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Process Refund (Admin)
const processRefund = async (req, res) => {
  try {
    const { refundId, status, adminId } = req.body;

    if (!refundId || !status) {
      return res.json({ success: false, message: "Missing refund ID or status" });
    }

    const validStatuses = ["Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const db = readDB();

    const refundIndex = db.refunds.findIndex(r => r._id === refundId);

    if (refundIndex === -1) {
      return res.json({ success: false, message: "Refund not found" });
    }

    // Update refund status
    db.refunds[refundIndex].status = status;
    db.refunds[refundIndex].processedAt = new Date().toISOString();
    db.refunds[refundIndex].processedBy = adminId;

    // If approved, update order status to "Refunded"
    if (status === "Approved") {
      const orderIndex = db.orders.findIndex(o => o._id === db.refunds[refundIndex].orderId);
      if (orderIndex !== -1) {
        db.orders[orderIndex].status = "Refunded";
        db.orders[orderIndex].refundId = refundId;
      }
    }

    writeDB(db);

    res.json({ success: true, message: `Refund ${status.toLowerCase()} successfully`, refund: db.refunds[refundIndex] });
  } catch (error) {
    console.error("Process Refund Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Get User Refunds
const getUserRefunds = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing user ID" });
    }

    const db = readDB();

    if (!db.refunds) {
      return res.json({ success: true, refunds: [] });
    }

    const userRefunds = db.refunds.filter(r => r.userId === userId);

    // Sort by request date (newest first)
    const sortedRefunds = userRefunds.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));

    res.json({ success: true, refunds: sortedRefunds });
  } catch (error) {
    console.error("Get User Refunds Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  requestRefund,
  getAllRefunds,
  processRefund,
  getUserRefunds
};
