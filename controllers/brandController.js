const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Brand = require('../models/brandModel');
const ApiError = require('../utils/ApiError');

// @desc    Get all brands
// @route   GET /api/brands
// @access  Puplic

exports.getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await Brand.find().skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    length: brands.length,
    page,
    data: { brands },
  });
});

// @desc    Get Specific brand
// @route   GET /api/brands/:id
// @access  Puplic

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) return next(new ApiError(`No brand for this ID ${id}`, 404));
  res.status(200).json({ status: 'success', data: { brand } });
});

// @desc    Create brand
// @route   POST /api/brands
// @access  Private

exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newBrand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({
    status: 'success',
    data: { newBrand },
  });
});

// @desc    Update brand
// @route   PATCH /api/brands/:id
// @access  Private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    {
      new: true,
    },
  );

  if (!brand) return next(new ApiError(`No brand for this ID ${id}`, 404));

  res.status(200).json({ status: 'success', data: { brand } });
});

// @desc    Delete brand
// @route   DELETE /api/brands/:id
// @access  Private

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) return next(new ApiError(`No brand for this ID ${id}`, 404));

  res.status(204).json({ status: 'success' });
});
