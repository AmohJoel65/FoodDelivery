const { readDB, writeDB } = require('../config/db');
const fs = require('fs');
const path = require('path');

// Add Food Item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category, ingredients, image } = req.body;

    if (!name || !price || !category) {
      return res.json({ success: false, message: "Missing required food fields (Name, Price, Category)" });
    }

    // Capture file upload name or fall back to external image URL
    let finalImage = "";
    if (req.file) {
      finalImage = `/images/${req.file.filename}`;
    } else if (image) {
      finalImage = image;
    } else {
      finalImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"; // Elegant default
    }

    const db = readDB();
    const newFood = {
      _id: "food_" + Date.now().toString() + Math.random().toString(36).substr(2, 4),
      name,
      description: description || "Fresh chef-crafted artisanal dish made with locally-sourced premium ingredients.",
      price: Number(price),
      category,
      image: finalImage,
      ingredients: ingredients || "Organic Seasonal Ingredients"
    };

    db.foods.push(newFood);
    writeDB(db);

    res.json({ success: true, message: "Artisan item added successfully", item: newFood });
  } catch (error) {
    console.error("Add Food Error:", error);
    res.json({ success: false, message: "Failed to add artisan food item" });
  }
};

// List Food Items
const listFood = async (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, data: db.foods });
  } catch (error) {
    console.error("List Food Error:", error);
    res.json({ success: false, message: "Failed to load food menu" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ success: false, message: "Missing item ID" });
    }

    const db = readDB();
    const itemIndex = db.foods.findIndex(f => f._id === id);

    if (itemIndex === -1) {
      return res.json({ success: false, message: "Item not found in inventory" });
    }

    const item = db.foods[itemIndex];

    // If it's a locally uploaded image, clean it up from uploads folder
    if (item.image && item.image.startsWith('/images/')) {
      const filename = item.image.replace('/images/', '');
      const filepath = path.join(__dirname, '..', 'uploads', filename);
      if (fs.existsSync(filepath)) {
        try {
          fs.unlinkSync(filepath);
        } catch (err) {
          console.error("Error deleting local image file:", err);
        }
      }
    }

    db.foods.splice(itemIndex, 1);
    writeDB(db);

    res.json({ success: true, message: "Artisan item removed successfully" });
  } catch (error) {
    console.error("Remove Food Error:", error);
    res.json({ success: false, message: "Failed to delete food item" });
  }
};

// Update Food Item
const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category, ingredients, image, sourcing, prepTime, stock, lowStockThreshold } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Missing item ID" });
    }

    const db = readDB();
    const itemIndex = db.foods.findIndex(f => f._id === id);

    if (itemIndex === -1) {
      return res.json({ success: false, message: "Item not found in inventory" });
    }

    // Update only provided fields
    if (name) db.foods[itemIndex].name = name;
    if (description !== undefined) db.foods[itemIndex].description = description;
    if (price !== undefined) db.foods[itemIndex].price = Number(price);
    if (category) db.foods[itemIndex].category = category;
    if (ingredients !== undefined) db.foods[itemIndex].ingredients = ingredients;
    if (image !== undefined) db.foods[itemIndex].image = image;
    if (sourcing !== undefined) db.foods[itemIndex].sourcing = sourcing;
    if (prepTime !== undefined) db.foods[itemIndex].prepTime = prepTime;
    if (stock !== undefined) db.foods[itemIndex].stock = Number(stock);
    if (lowStockThreshold !== undefined) db.foods[itemIndex].lowStockThreshold = Number(lowStockThreshold);

    writeDB(db);

    res.json({ success: true, message: "Artisan item updated successfully", item: db.foods[itemIndex] });
  } catch (error) {
    console.error("Update Food Error:", error);
    res.json({ success: false, message: "Failed to update food item" });
  }
};

module.exports = {
  addFood,
  listFood,
  removeFood,
  updateFood
};
