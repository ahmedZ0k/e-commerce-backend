const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const User = require('../models/userModel');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

// @desc    Create user
// @route   POST /api/users
// @access  Private

exports.createUser = createOne(User);

// @desc    Get all users
// @route   GET /api/users
// @access  Private

exports.getAllUsers = getAll(User);

// @desc    Get Specific user
// @route   GET /api/users/:id
// @access  Private

exports.getUser = getOne(User);

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Private

exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImg: req.body.profileImg,
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ status: 'success', data: document });
});
exports.changeUserPassword = expressAsyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    },
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ status: 'success', data: document });
});
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private

exports.deleteUser = deleteOne(User, 'User');
