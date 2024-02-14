const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validatores/categoryValidator');

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const { protect, allowedTo } = require('../controllers/authController');

const subCategoryRoute = require('./subCategoryRoute');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRoute);
router
  .route('/')
  .get(getAllCategories)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    createCategoryValidator,
    createCategory,
  );

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .patch(
    protect,
    allowedTo('admin', 'manager'),
    updateCategoryValidator,
    updateCategory,
  )
  .delete(protect, allowedTo('admin'), deleteCategoryValidator, deleteCategory);

module.exports = router;
