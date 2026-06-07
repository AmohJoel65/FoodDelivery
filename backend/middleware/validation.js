const Joi = require('joi');
const { formatValidationError } = require('../utils/formatValidationError');

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      return res.json({
        success: false,
        message: formatValidationError(error),
        code: "VALIDATION_ERROR",
      });
    }
    next();
  };
};

const cameroonPhoneSchema = Joi.string()
  .pattern(/^(\+?237)?[6-9]\d{8}$/)
  .required()
  .messages({
    "string.pattern.base": "Please enter a valid Cameroon phone number (e.g. 677123456).",
    "any.required": "Phone number is required.",
    "string.empty": "Phone number is required.",
  });

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must not exceed 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  })
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': 'Reset token is required'
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'New password is required'
  })
});

// Food validation schemas
const addFoodSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  image: Joi.string().uri(),
  ingredients: Joi.string(),
  sourcing: Joi.string(),
  prepTime: Joi.string(),
  stock: Joi.number().integer().min(0),
  lowStockThreshold: Joi.number().integer().min(0)
});

const updateFoodSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).max(100),
  description: Joi.string().max(500),
  price: Joi.number().positive(),
  category: Joi.string(),
  image: Joi.string().uri(),
  ingredients: Joi.string(),
  sourcing: Joi.string(),
  prepTime: Joi.string(),
  stock: Joi.number().integer().min(0),
  lowStockThreshold: Joi.number().integer().min(0)
});

// Order validation schemas — Cameroon delivery format
const placeOrderSchema = Joi.object({
  userId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().positive().required(),
      quantity: Joi.number().integer().positive().required(),
      description: Joi.string().allow('', null),
      category: Joi.string().allow('', null),
      image: Joi.string().allow('', null),
    }).unknown(true)
  ).min(1).required().messages({
    "array.min": "Your cart is empty. Add items before placing an order.",
  }),
  amount: Joi.number().positive().required(),
  address: Joi.object({
    fullName: Joi.string().min(2).max(80).required().messages({
      "any.required": "Please enter your full name.",
      "string.empty": "Please enter your full name.",
      "string.min": "Your name must be at least 2 characters.",
    }),
    phone: cameroonPhoneSchema,
    city: Joi.string().required().messages({
      "any.required": "Please select your city.",
      "string.empty": "Please select your city.",
    }),
    quarter: Joi.string().min(2).required().messages({
      "any.required": "Please enter your neighborhood (quarter).",
      "string.empty": "Please enter your neighborhood (quarter).",
      "string.min": "Neighborhood name is too short.",
    }),
    landmark: Joi.string().allow('', null).max(120),
  }).required(),
  couponCode: Joi.string().allow('', null),
  deliveryZoneId: Joi.string().allow('', null),
  deliveryTimeSlotId: Joi.string().allow('', null),
  deliveryDate: Joi.string().allow('', null),
});

const cancelOrderSchema = Joi.object({
  orderId: Joi.string().required(),
  userId: Joi.string().required()
});

const updateOrderStatusSchema = Joi.object({
  orderId: Joi.string().required(),
  status: Joi.string().valid('Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled').required()
});

// Cart validation schemas
const addToCartSchema = Joi.object({
  userId: Joi.string().required(),
  itemId: Joi.string().required()
});

const removeFromCartSchema = Joi.object({
  userId: Joi.string().required(),
  itemId: Joi.string().required()
});

// Review validation schemas
const addReviewSchema = Joi.object({
  foodId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(500)
});

// Coupon validation schemas
const createCouponSchema = Joi.object({
  code: Joi.string().min(3).max(20).required(),
  discountType: Joi.string().valid('percentage', 'fixed').required(),
  discountValue: Joi.number().positive().required(),
  minOrderAmount: Joi.number().min(0),
  maxDiscountAmount: Joi.number().min(0),
  expiryDate: Joi.date().iso(),
  usageLimit: Joi.number().integer().min(1),
  isActive: Joi.boolean()
});

const validateCouponSchema = Joi.object({
  code: Joi.string().required(),
  orderAmount: Joi.number().positive().required()
});

// User management schemas
const banUserSchema = Joi.object({
  userId: Joi.string().required()
});

const deleteUserSchema = Joi.object({
  userId: Joi.string().required()
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  addFoodSchema,
  updateFoodSchema,
  placeOrderSchema,
  cancelOrderSchema,
  updateOrderStatusSchema,
  addToCartSchema,
  removeFromCartSchema,
  addReviewSchema,
  createCouponSchema,
  validateCouponSchema,
  banUserSchema,
  deleteUserSchema
};
