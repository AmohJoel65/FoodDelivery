const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');
const { validate, addToCartSchema, removeFromCartSchema } = require('../middleware/validation');

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, validate(addToCartSchema), addToCart);
cartRouter.post('/remove', authMiddleware, validate(removeFromCartSchema), removeFromCart);
cartRouter.get('/get', authMiddleware, getCart); // matches /api/cart/get

module.exports = cartRouter;
