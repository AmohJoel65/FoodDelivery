const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    default: 'Organic Seasonal Ingredients'
  },
  sourcing: {
    type: String
  },
  prepTime: {
    type: String
  },
  stock: {
    type: Number,
    default: 100
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
