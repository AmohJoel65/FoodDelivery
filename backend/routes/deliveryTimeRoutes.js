const express = require('express');
const { getAllTimeSlots, getAvailableTimeSlots, createTimeSlot, updateTimeSlot, deleteTimeSlot } = require('../controllers/deliveryTimeController');

const deliveryTimeRouter = express.Router();

deliveryTimeRouter.get('/slots', getAllTimeSlots);
deliveryTimeRouter.get('/available-slots', getAvailableTimeSlots);
deliveryTimeRouter.post('/create-slot', createTimeSlot);
deliveryTimeRouter.post('/update-slot', updateTimeSlot);
deliveryTimeRouter.delete('/:id', deleteTimeSlot);

module.exports = deliveryTimeRouter;
