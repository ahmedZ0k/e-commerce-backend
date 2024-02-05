const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product Id'),
  validatorMiddleware,
];

exports.createProductValidator = [
  check('title')
    .notEmpty()
    .withMessage('Product name required')
    .isLength({ min: 3 })
    .withMessage('too short Product name'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description must be at most 2000 characters long'),
  check('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isNumeric()
    .withMessage('Quantity must be a number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product Sold Quantity must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .isLength({ max: 20 })
    .withMessage('Price must be at most 20 characters long'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Price After Discount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error('Price After Discount must be less than Price');
      }
      return true;
    }),
  check('colors').optional().isArray().withMessage('Colors must be an array'),
  check('imageCover').notEmpty().withMessage('Image cover is required'),
  check('images').optional().isArray().withMessage('Images must be an array'),
  check('category')
    .notEmpty()
    .withMessage('Category is required')
    .isMongoId()
    .withMessage('Invalid Category Id')
    .custom(async value => {
      const category = await Category.findById(value);
      if (!category) {
        throw new Error(`No Category found with id: ${value}`);
      }
    }),
  // BUG: SubCategory CUSTOM validation is not working
  check('subcategories')
    .optional()
    .isMongoId()
    .withMessage('Invalid Subcategory Id')
    .custom(async value => {
      const subcategories = await SubCategory.find({
        _id: { $exists: true, $in: value },
      });
      if (subcategories.length < 1 || subcategories.length !== value.length) {
        throw new Error(`Invalid Subcategory IDs`);
      }
    })
    .custom(async (value, { req }) => {
      const subcategories = await SubCategory.find({
        category: req.body.category,
      });

      const subcategoriesIds = [];
      subcategories.forEach(sub => subcategoriesIds.push(sub._id.toString()));

      const checker = (val, arr) => val.every(v => arr.includes(v));

      if (!checker(value, subcategoriesIds))
        throw new Error(
          `SubCategories Do not belong to this Category ${req.body.category}`,
        );
    }),
  check('brand').optional().isMongoId().withMessage('Invalid Brand Id'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('Invalid Rating')
    .isLength({ min: 1 })
    .withMessage('Rating must be at least 1.0 or above')
    .isLength({ max: 5 })
    .withMessage('Rating must be at most 5.0 or below'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('Invalid Rating Quantity'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product Id'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product Id'),
  validatorMiddleware,
];
