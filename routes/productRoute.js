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
} = require('../controllers/productController');

const { protect, allowedTo } = require('../controllers/authController');

const subCategoryRoute = require('./subCategoryRoute');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRoute);
router
  .route('/')
  .get(getAllProducts)
  .post(
    protect,
    allowedTo('admin', 'manager'),
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
