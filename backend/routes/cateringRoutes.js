const express = require('express');
const { submitCateringInquiry } = require('../controllers/cateringController');

const cateringRouter = express.Router();

cateringRouter.post('/submit', submitCateringInquiry);

module.exports = cateringRouter;
