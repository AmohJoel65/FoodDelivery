const express = require('express');
const { createCoupon, getAllCoupons, validateCoupon, updateCoupon, deleteCoupon, incrementCouponUsage } = require('../controllers/couponController');
const { validate, createCouponSchema, validateCouponSchema } = require('../middleware/validation');

const couponRouter = express.Router();

couponRouter.post('/create', validate(createCouponSchema), createCoupon);
couponRouter.get('/all', getAllCoupons);
couponRouter.post('/validate', validate(validateCouponSchema), validateCoupon);
couponRouter.post('/update', updateCoupon);
couponRouter.delete('/:id', deleteCoupon);
couponRouter.post('/increment-usage', incrementCouponUsage);

module.exports = couponRouter;
