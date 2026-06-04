const { readDB, writeDB } = require('../config/db');

// Add Item to Cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing user ID or item ID" });
    }

    const db = readDB();

    // Check if food exists and has stock
    const food = db.foods.find(f => f._id === itemId);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Check stock availability
    if (food.stock !== undefined && food.stock <= 0) {
      return res.json({ success: false, message: "This item is currently out of stock" });
    }

    const userIndex = db.users.findIndex(u => u._id === userId);
    if (userIndex === -1) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!db.users[userIndex].cartData) {
      db.users[userIndex].cartData = {};
    }

    const currentQty = db.users[userIndex].cartData[itemId] || 0;

    // Check if adding would exceed available stock
    if (food.stock !== undefined && currentQty >= food.stock) {
      return res.json({ success: false, message: "Maximum stock reached for this item" });
    }

    // Increment quantity
    db.users[userIndex].cartData[itemId] = currentQty + 1;
    writeDB(db);

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.json({ success: false, message: "Failed to add item to cart" });
  }
};

// Remove Item from Cart (Decrement / Delete)
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!itemId) {
      return res.json({ success: false, message: "Missing item ID" });
    }

    const db = readDB();
    const userIndex = db.users.findIndex(u => u._id === userId);

    if (userIndex === -1) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = db.users[userIndex].cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId] <= 1) {
        delete cartData[itemId];
      } else {
        cartData[itemId] -= 1;
      }
    }

    db.users[userIndex].cartData = cartData;
    writeDB(db);

    res.json({ success: true, message: "Removed from cart successfully", cartData });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.json({ success: false, message: "Failed to update cart" });
  }
};

// Get User Cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const db = readDB();
    const user = db.users.find(u => u._id === userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.json({ success: false, message: "Failed to load cart state" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart
};
