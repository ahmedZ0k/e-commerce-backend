const expressAsyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const Category = require('../models/categoryModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

// Middlware to upload single image
exports.uploadCategoryImage = uploadSingleImage('image');

// Image Processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.webp`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('webp')
    .webp({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  req.body.image = filename;

  next();
});

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
