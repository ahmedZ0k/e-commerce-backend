const Brand = require('../models/brandModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

// @desc    Create brand
// @route   POST /api/brands
// @access  Private

exports.createBrand = createOne(Brand);

// @desc    Get all brands
// @route   GET /api/brands
// @access  Puplic

exports.getAllBrands = getAll(Brand);

// @desc    Get Specific brand
// @route   GET /api/brands/:id
// @access  Puplic

exports.getBrand = getOne(Brand);

// @desc    Update brand
// @route   PATCH /api/brands/:id
// @access  Private

exports.updateBrand = updateOne(Brand);

// @desc    Delete brand
// @route   DELETE /api/brands/:id
// @access  Private

exports.deleteBrand = deleteOne(Brand);
