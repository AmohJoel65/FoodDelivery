const express = require('express');
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, cancelOrder, updateOrderStatus, getDashboardStats } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const { validate, placeOrderSchema, cancelOrderSchema, updateOrderStatusSchema } = require('../middleware/validation');

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, validate(placeOrderSchema), placeOrder);
orderRouter.post('/verify', verifyOrder); // callback checks don't strictly require token
orderRouter.get('/userorders', authMiddleware, userOrders); // fetch logged-in user orders
orderRouter.get('/list', listOrders); // admin panel lists all orders
orderRouter.post('/status', updateStatus); // admin updates fulfillment state
orderRouter.post('/cancel', validate(cancelOrderSchema), cancelOrder);
orderRouter.post('/update-status', validate(updateOrderStatusSchema), updateOrderStatus);
orderRouter.get('/dashboard', getDashboardStats); // fetch live operational telemetry metrics

module.exports = orderRouter;
