const express = require('express');
const { getTaxConfig, calculateTax, updateTaxConfig } = require('../controllers/taxController');

const taxRouter = express.Router();

taxRouter.get('/config', getTaxConfig);
taxRouter.post('/calculate', calculateTax);
taxRouter.post('/update-config', updateTaxConfig);

module.exports = taxRouter;
