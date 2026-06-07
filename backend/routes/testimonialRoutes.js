const express = require('express');
const { addTestimonial, listTestimonials } = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/auth');

const testimonialRouter = express.Router();

testimonialRouter.get('/list', listTestimonials);
testimonialRouter.post('/add', authMiddleware, addTestimonial);

module.exports = testimonialRouter;
