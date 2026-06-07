const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, getAllUsers, banUser, deleteUser } = require('../controllers/userController');
const { validate, registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, banUserSchema, deleteUserSchema } = require('../middleware/validation');

const { authLimiter } = require('../middleware/rateLimit');

const userRouter = express.Router();

userRouter.post('/register', authLimiter, validate(registerSchema), registerUser);
userRouter.post('/login', authLimiter, validate(loginSchema), loginUser);
userRouter.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
userRouter.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);
userRouter.get('/all', getAllUsers);
userRouter.post('/ban', validate(banUserSchema), banUser);
userRouter.post('/delete', validate(deleteUserSchema), deleteUser);

module.exports = userRouter;
