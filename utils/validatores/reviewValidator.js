const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');

exports.getReviewValidator = [
  check('id').isMongoId().withMessage('Invalid Review Id'),
  validatorMiddleware,
];

exports.createReviewValidator = [
  check('title').optional(),
  check('ratings')
    .notEmpty()
    .withMessage('rating value required')
    .isFloat({ min: 1, max: 5 })
    .withMessage('rating value must be between 1 to 5'),
  check('user').isMongoId().withMessage('Invalid User Id'),
  check('product')
    .isMongoId()
    .withMessage('Invalid Product Id')
    .custom(async (val, { req }) => {
      const review = await Review.findOne({ user: req.user._id, product: val });
      if (review) {
        throw new Error('you already have review on this product');
      }
    }),

  validatorMiddleware,
];

exports.updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review Id')
    .custom(async (val, { req }) => {
      const review = await Review.findById(val);
      if (!review) {
        throw new Error(`no review found for this id ${val}`);
      }
      if (review.user._id.toString() !== req.user._id.toString()) {
        throw new Error(`you are not allowed to update another user review`);
      }
    }),

  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Review Id')
    .custom(async (val, { req }) => {
      if (req.user.role === 'user') {
        const review = await Review.findById(val);
        if (!review) {
          throw new Error(`no review found for this id ${val}`);
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          throw new Error(`you are not allowed to delete another user review`);
        }
      }
    }),
  validatorMiddleware,
];
