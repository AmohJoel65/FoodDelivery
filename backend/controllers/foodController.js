const Food = require('../models/Food');
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

    const newFood = await Food.create({
      name,
      description: description || "Fresh chef-crafted artisanal dish made with locally-sourced premium ingredients.",
      price: Number(price),
      category,
      image: finalImage,
      ingredients: ingredients || "Organic Seasonal Ingredients"
    });

    res.json({ success: true, message: "Artisan item added successfully", item: newFood });
  } catch (error) {
    console.error("Add Food Error:", error);
    res.json({ success: false, message: "Failed to add artisan food item" });
  }
};

// List Food Items
const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
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

    const item = await Food.findById(id);
    if (!item) {
      return res.json({ success: false, message: "Item not found in inventory" });
    }

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

    await Food.findByIdAndDelete(id);

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

    const item = await Food.findById(id);
    if (!item) {
      return res.json({ success: false, message: "Item not found in inventory" });
    }

    // Update fields
    if (name) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = Number(price);
    if (category) item.category = category;
    if (ingredients !== undefined) item.ingredients = ingredients;
    if (image !== undefined) item.image = image;
    if (sourcing !== undefined) item.sourcing = sourcing;
    if (prepTime !== undefined) item.prepTime = prepTime;
    if (stock !== undefined) item.stock = Number(stock);
    if (lowStockThreshold !== undefined) item.lowStockThreshold = Number(lowStockThreshold);

    await item.save();

    res.json({ success: true, message: "Artisan item updated successfully", item });
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
