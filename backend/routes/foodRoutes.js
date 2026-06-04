const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { addFood, listFood, removeFood, updateFood } = require('../controllers/foodController');
const { validate, addFoodSchema, updateFoodSchema } = require('../middleware/validation');

const foodRouter = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`);
  }
});

const upload = multer({ storage });

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood); // matches /api/food/remove exactly
foodRouter.post('/update', updateFood); // update food item

module.exports = foodRouter;
