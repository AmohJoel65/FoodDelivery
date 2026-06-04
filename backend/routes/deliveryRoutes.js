const express = require('express');
const { getAllDeliveryZones, calculateDeliveryFee, createDeliveryZone, updateDeliveryZone, deleteDeliveryZone } = require('../controllers/deliveryController');

const deliveryRouter = express.Router();

deliveryRouter.get('/zones', getAllDeliveryZones);
deliveryRouter.post('/calculate-fee', calculateDeliveryFee);
deliveryRouter.post('/create-zone', createDeliveryZone);
deliveryRouter.post('/update-zone', updateDeliveryZone);
deliveryRouter.delete('/:id', deleteDeliveryZone);

module.exports = deliveryRouter;
