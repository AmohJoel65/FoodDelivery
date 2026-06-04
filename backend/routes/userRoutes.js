const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword, getAllUsers, banUser, deleteUser } = require('../controllers/userController');
const { validate, registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, banUserSchema, deleteUserSchema } = require('../middleware/validation');

const userRouter = express.Router();

userRouter.post('/register', validate(registerSchema), registerUser);
userRouter.post('/login', validate(loginSchema), loginUser);
userRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
userRouter.post('/reset-password', validate(resetPasswordSchema), resetPassword);
userRouter.get('/all', getAllUsers);
userRouter.post('/ban', validate(banUserSchema), banUser);
userRouter.post('/delete', validate(deleteUserSchema), deleteUser);

module.exports = userRouter;
