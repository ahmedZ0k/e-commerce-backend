const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Category = require('../models/categoryModel');
const ApiError = require('../utils/ApiError');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Puplic

exports.getAllCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find().skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    length: categories.length,
    page,
    data: { categories },
  });
});

// @desc    Get Specific category
// @route   GET /api/categories/:id
// @access  Puplic

exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category)
    return next(new ApiError(`No category for this ID ${id}`, 404));
  res.status(200).json({ status: 'success', data: { category } });
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({
    status: 'success',
    data: { newCategory },
  });
});

// @desc    Update category
// @route   PATCH /api/categories/:id
// @access  Private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    {
      new: true,
    },
  );

  if (!category)
    return next(new ApiError(`No category for this ID ${id}`, 404));

  res.status(200).json({ status: 'success', data: { category } });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category)
    return next(new ApiError(`No category for this ID ${id}`, 404));

  res.status(204).json({ status: 'success' });
});
