const express = require('express');

const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  getFilterObj,
  setProductIdAndUserIdToBody,
} = require('../controllers/reviewController');

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('../utils/validatores/reviewValidator');

const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getFilterObj, getAllReviews)
  .post(
    protect,
    allowedTo('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview,
  );

router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .patch(protect, allowedTo('user'), updateReviewValidator, updateReview)
  .delete(
    protect,
    allowedTo('user', 'manager', 'admin'),
    deleteReviewValidator,
    deleteReview,
  );

module.exports = router;
