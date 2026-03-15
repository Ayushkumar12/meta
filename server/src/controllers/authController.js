const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for admin first, then user
  let user = await Admin.findOne({ email }).select('+password');
  let isFromAdminCollection = true;

  if (!user) {
    user = await User.findOne({ email }).select('+password');
    isFromAdminCollection = false;
  }

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.status(200).json({
    success: true,
    token,
    admin: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    admin: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role
    }
  });
});

// @desc    Setup initial admin
// @route   POST /api/auth/setup
// @access  Public
exports.setupAdmin = asyncHandler(async (req, res, next) => {
  const userCount = await User.countDocuments();
  
  if (userCount > 0) {
    return next(new ErrorResponse('Admin already established', 400));
  }

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@metacode.co.in',
    password: 'password123',
    role: 'admin'
  });

  res.status(201).json({
    success: true,
    message: 'Admin created successfully. Please login with admin@metacode.co.in / password123'
  });
});

// @desc    Create a new user
// @route   POST /api/auth/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});
