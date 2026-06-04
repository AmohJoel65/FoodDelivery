const express = require('express');
const { exportOrders, exportUsers, exportFoods, exportCoupons } = require('../controllers/exportController');

const exportRouter = express.Router();

exportRouter.get('/orders', exportOrders);
exportRouter.get('/users', exportUsers);
exportRouter.get('/foods', exportFoods);
exportRouter.get('/coupons', exportCoupons);

module.exports = exportRouter;
