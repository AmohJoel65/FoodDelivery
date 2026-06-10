const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/emailService');

// Token Generator
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'joel_artisan_secret_2026_key_superb', {
    expiresIn: '7d'
  });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all required fields" });
    }

    // Check if user already exists
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.json({ success: false, message: "User already exists with this email" });
    }

    // Validate email and password length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ success: false, message: "Please enter a valid email address" });
    }

    if (password.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      cartData: {},
      isAdmin: false
    });

    const token = createToken(newUser._id);
    res.json({
      success: true,
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.json({ success: false, message: "Internal server error during registration" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.json({ success: false, message: "Please enter email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    if (user.isBanned) {
      return res.json({ success: false, message: "This account has been suspended" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        isAdmin: !!user.isAdmin
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.json({ success: false, message: "Internal server error during login" });
  }
};

// Forgot Password - Generate Reset Token
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.json({ success: false, message: "Please provide your email address" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: false, message: "User not found with this email" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Store reset token in user record
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email
    sendPasswordResetEmail(email, resetToken).catch(emailError => {
      console.error('Failed to send password reset email:', emailError);
    });

    res.json({
      success: true,
      message: "Password reset link sent to your email"
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    if (!token || !newPassword) {
      return res.json({ success: false, message: "Missing token or new password" });
    }

    if (newPassword.length < 6) {
      return res.json({ success: false, message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ 
      resetToken: token, 
      resetTokenExpiry: { $gt: Date.now() } 
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired reset token" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Get All Users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    // Remove sensitive data (password) from response
    const safeUsers = users.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
      isBanned: user.isBanned || false,
      createdAt: user.createdAt
    }));

    res.json({ success: true, users: safeUsers });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Ban User (Admin)
const banUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if user is admin
    if (user.isAdmin) {
      return res.json({ success: false, message: "Cannot ban admin users" });
    }

    // Toggle ban status
    user.isBanned = !user.isBanned;
    await user.save();

    res.json({ 
      success: true, 
      message: user.isBanned ? "User banned successfully" : "User unbanned successfully",
      isBanned: user.isBanned
    });
  } catch (error) {
    console.error("Ban User Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Delete User (Admin)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if user is admin
    if (user.isAdmin) {
      return res.json({ success: false, message: "Cannot delete admin users" });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  banUser,
  deleteUser
};
