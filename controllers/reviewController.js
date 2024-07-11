const Review = require('../models/reviewModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

// @desc    Create Review For Specific Product
// @route   POST /api/products/productId/reviews
// @access  Private/Protect/User

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

// @desc    Create Review
// @route   POST /api/review
// @access  Private/Protect/User

exports.createReview = createOne(Review);

// @desc    Get All Reviews For Specific Product
// @route   Get /api/products/productId/reviews
// @access  Public

exports.getFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.productId) filterObj = { product: req.params.productId };
  req.filterObj = filterObj;
  next();
};

// @desc    Get list of reviews
// @route   GET /api/reviews
// @access  Puplic

exports.getAllReviews = getAll(Review);

// @desc    Get Specific review by id
// @route   GET /api/reviews/:id
// @access  Puplic

exports.getReview = getOne(Review);

// @desc    Update review
// @route   PATCH /api/reviews/:id
// @access  Private/Protect/User

exports.updateReview = updateOne(Review);

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Protect/User-Admin-Manager

exports.deleteReview = deleteOne(Review);
