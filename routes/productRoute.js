const express = require('express');

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validatores/productValidator');

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImage,
} = require('../controllers/productController');

const { protect, allowedTo } = require('../controllers/authController');

const reviewRoute = require('./reviewRoute');

const router = express.Router();

router.use('/:productId/reviews', reviewRoute);

router
  .route('/')
  .get(getAllProducts)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImage,
    createProductValidator,
    createProduct,
  );

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .patch(
    protect,
    allowedTo('admin', 'manager'),
    updateProductValidator,
    updateProduct,
  )
  .delete(protect, allowedTo('admin'), deleteProductValidator, deleteProduct);

module.exports = router;
