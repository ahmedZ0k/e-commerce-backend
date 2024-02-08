const Product = require('../models/productModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlersFactory');

// @desc    Create product
// @route   POST /api/products
// @access  Private

exports.createProduct = createOne(Product);

// @desc    Get all products
// @route   GET /api/products
// @access  Puplic

exports.getAllProducts = getAll(Product, 'Product');

// @desc    Get Specific product
// @route   GET /api/products/:id
// @access  Puplic

exports.getProduct = getOne(Product);

// @desc    Update product
// @route   PATCH /api/products/:id
// @access  Private

exports.updateProduct = updateOne(Product);

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private

exports.deleteProduct = deleteOne(Product);
