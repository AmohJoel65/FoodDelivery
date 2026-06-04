const express = require('express');
const { requestRefund, getAllRefunds, processRefund, getUserRefunds } = require('../controllers/refundController');

const refundRouter = express.Router();

refundRouter.post('/request', requestRefund);
refundRouter.get('/all', getAllRefunds);
refundRouter.post('/process', processRefund);
refundRouter.post('/user', getUserRefunds);

module.exports = refundRouter;
