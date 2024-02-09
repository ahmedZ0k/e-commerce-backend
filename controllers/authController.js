const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const User = require('../models/userModel');

const generateToken = payload => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  return token;
};

// @desc    Signup
// @route   POST /api/auth/signup
// @access  Public

exports.signup = expressAsyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = generateToken({ userId: user._id });

  res.status(201).json({ token, data: user });
});

// @desc    Login
// @route   POST /api/auth/login
// @access  Public

exports.login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError('email and password are required', 400));
  }
  const user = await User.findOne({ email });

  if (user) {
    const checker = await bcrypt.compare(password, user.password);

    if (!checker) {
      return next(new ApiError('incorrect password', 400));
    }
  } else {
    return next(
      new ApiError('there is no user with this email, please sign up', 400),
    );
  }
  const token = generateToken({ userId: user._id });

  res.status(200).json({ token, data: user });
});

exports.protect = expressAsyncHandler(async (req, res, next) => {
  // 1) Check if token exist
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return next(new ApiError('you are not logged in'), 401);
  }
  const token = req.headers.authorization.split(' ')[1];
  //  2) verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) check if user exist
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(
      new ApiError('user that belong to this token is no longer exist', 401),
    );
  }

  // 4) Check if the password changed
  if (user.passwordChangedAt) {
    const passwordChangedAtTimeInSeconds = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10,
    );
    if (passwordChangedAtTimeInSeconds > decoded.iat) {
      return next(
        new ApiError(
          'the password has changed recently, please login again',
          401,
        ),
      );
    }
  }

  req.user = user;
  next();
});
