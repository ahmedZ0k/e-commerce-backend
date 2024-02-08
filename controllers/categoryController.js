const Category = require('../models/categoryModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

// @desc    Create category
// @route   POST /api/categories
// @access  Private

exports.createCategory = createOne(Category);

// @desc    Get all categories
// @route   GET /api/categories
// @access  Puplic

exports.getAllCategories = getAll(Category);

// @desc    Get Specific category
// @route   GET /api/categories/:id
// @access  Puplic

exports.getCategory = getOne(Category);

// @desc    Update category
// @route   PATCH /api/categories/:id
// @access  Private

exports.updateCategory = updateOne(Category);

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private

exports.deleteCategory = deleteOne(Category);
