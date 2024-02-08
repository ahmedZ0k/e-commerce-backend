const SubCategory = require('../models/subCategoryModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

// @desc    Create subCategories
// @route   POST /api/subcategories
// @access  Private

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;

  next();
};

exports.createSubCategory = createOne(SubCategory);

// @desc    Get All subCategories
// @route   GET /api/subcategories
// @access  Puplic

// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};

exports.getAllSubCategories = getAll(SubCategory);

// @desc    Get Specific subCategory
// @route   GET /api/subcategories/:id
// @access  Puplic

exports.getSubCategory = getOne(SubCategory);

// @desc    Update subCategory
// @route   PATCH /api/subcategories/:id
// @access  Private

exports.updateSubCategory = updateOne(SubCategory);

// @desc    Delete subCategory
// @route   DELETE /api/subcategories/:id
// @access  Private

exports.deleteSubCategory = deleteOne(SubCategory);
