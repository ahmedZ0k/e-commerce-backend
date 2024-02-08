const { check } = require('express-validator');
const { default: slugify } = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory Id'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory name required')
    .isLength({ min: 2 })
    .withMessage('too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('too long Subcategory name')
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check('category')
    .notEmpty()
    .withMessage('subcategory must belong to category')
    .isMongoId()
    .withMessage('Invalid Category Id format'),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory Id'),
  check('name')
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id')
    .notEmpty()
    .withMessage('Must Provide a SubCategory ID parameter')
    .isMongoId()
    .withMessage('Invalid SubCategory Id'),
  validatorMiddleware,
];
