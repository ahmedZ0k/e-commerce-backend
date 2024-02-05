const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const SubCategory = require('../models/subCategoryModel');
const ApiError = require('../utils/ApiError');

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;

  next();
};

// @desc    Create subCategories
// @route   POST /api/subcategories
// @access  Private

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const newSubCategory = await SubCategory.create({
    name,
    category,
    slug: slugify(name),
  });
  res.status(201).json({
    status: 'success',
    data: { newSubCategory },
  });
});

// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};

// @desc    Get All subCategories
// @route   GET /api/subcategories
// @access  Puplic

exports.getAllSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name ' });

  res.status(200).json({
    status: 'success',
    length: subCategories.length,
    page,
    data: { subCategories },
  });
});

// @desc    Get Specific subCategory
// @route   GET /api/subcategories/:id
// @access  Puplic

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id);

  if (!subCategory)
    return next(new ApiError(`No subCategory for this ID ${id}`, 404));
  res.status(200).json({ status: 'success', data: { subCategory } });
});

// @desc    Update subCategory
// @route   PATCH /api/subcategories/:id
// @access  Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, category, slug: slugify(name) },
    {
      new: true,
    },
  );

  if (!subCategory)
    return next(new ApiError(`No subCategory for this ID ${id}`, 404));

  res.status(200).json({ status: 'success', data: { subCategory } });
});

// @desc    Delete subCategory
// @route   DELETE /api/subcategories/:id
// @access  Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await SubCategory.findByIdAndDelete(id);

  if (!category)
    return next(new ApiError(`No category for this ID ${id}`, 404));

  res.status(204).json({ status: 'success' });
});
