const { readDB } = require('../config/db');

// Convert data to CSV format
const convertToCSV = (data, headers) => {
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Escape quotes and wrap in quotes if contains comma or quote
      const escaped = String(value || '').replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

// Export Orders to CSV
const exportOrders = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const db = readDB();

    if (!db.orders) {
      return res.json({ success: false, message: "No orders found" });
    }

    let filteredOrders = db.orders;

    // Filter by date range if provided
    if (startDate || endDate) {
      filteredOrders = db.orders.filter(order => {
        const orderDate = new Date(order.date);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date();
        return orderDate >= start && orderDate <= end;
      });
    }

    // Define CSV headers
    const headers = ['Order ID', 'User ID', 'Amount', 'Status', 'Date', 'Payment Status', 'Delivery Zone'];
    
    // Transform data for CSV
    const csvData = filteredOrders.map(order => ({
      'Order ID': order._id,
      'User ID': order.userId,
      'Amount': order.amount,
      'Status': order.status,
      'Date': order.date,
      'Payment Status': order.paymentStatus || 'Pending',
      'Delivery Zone': order.deliveryZone || 'N/A'
    }));

    const csv = convertToCSV(csvData, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="orders_${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error("Export Orders Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Export Users to CSV
const exportUsers = async (req, res) => {
  try {
    const db = readDB();

    if (!db.users) {
      return res.json({ success: false, message: "No users found" });
    }

    // Define CSV headers
    const headers = ['User ID', 'Name', 'Email', 'Is Admin', 'Is Banned'];
    
    // Transform data for CSV (exclude password)
    const csvData = db.users.map(user => ({
      'User ID': user._id,
      'Name': user.name,
      'Email': user.email,
      'Is Admin': user.isAdmin ? 'Yes' : 'No',
      'Is Banned': user.isBanned ? 'Yes' : 'No'
    }));

    const csv = convertToCSV(csvData, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="users_${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error("Export Users Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Export Foods to CSV
const exportFoods = async (req, res) => {
  try {
    const db = readDB();

    if (!db.foods) {
      return res.json({ success: false, message: "No foods found" });
    }

    // Define CSV headers
    const headers = ['Food ID', 'Name', 'Category', 'Price', 'Stock', 'Low Stock Threshold'];
    
    // Transform data for CSV
    const csvData = db.foods.map(food => ({
      'Food ID': food._id,
      'Name': food.name,
      'Category': food.category,
      'Price': food.price,
      'Stock': food.stock || 0,
      'Low Stock Threshold': food.lowStockThreshold || 0
    }));

    const csv = convertToCSV(csvData, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="foods_${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error("Export Foods Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Export Coupons to CSV
const exportCoupons = async (req, res) => {
  try {
    const db = readDB();

    if (!db.coupons) {
      return res.json({ success: false, message: "No coupons found" });
    }

    // Define CSV headers
    const headers = ['Coupon ID', 'Code', 'Discount Type', 'Discount Value', 'Min Order Amount', 'Usage Limit', 'Usage Count', 'Is Active'];
    
    // Transform data for CSV
    const csvData = db.coupons.map(coupon => ({
      'Coupon ID': coupon._id,
      'Code': coupon.code,
      'Discount Type': coupon.discountType,
      'Discount Value': coupon.discountValue,
      'Min Order Amount': coupon.minOrderAmount || 0,
      'Usage Limit': coupon.usageLimit || 'Unlimited',
      'Usage Count': coupon.usageCount || 0,
      'Is Active': coupon.isActive ? 'Yes' : 'No'
    }));

    const csv = convertToCSV(csvData, headers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="coupons_${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error("Export Coupons Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  exportOrders,
  exportUsers,
  exportFoods,
  exportCoupons
};
