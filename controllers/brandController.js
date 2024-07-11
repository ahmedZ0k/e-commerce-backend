const expressAsyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const Brand = require('../models/brandModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

// Middlware to upload single image
exports.uploadBrandImage = uploadSingleImage('image');

// Image Processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.webp`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('webp')
    .webp({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;

  next();
});

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
