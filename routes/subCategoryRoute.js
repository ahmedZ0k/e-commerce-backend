const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  createSubCategory,
  getSubCategory,
  getAllSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObject,
} = require('../controllers/subCategoryController');

const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require('../utils/validatores/subCategoryValidator');

const { protect, allowedTo } = require('../controllers/authController');

router
  .route('/')
  .get(createFilterObject, getAllSubCategories)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory,
  );

router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .patch(
    protect,
    allowedTo('admin', 'manager'),
    updateSubCategoryValidator,
    updateSubCategory,
  )
  .delete(
    protect,
    allowedTo('admin'),
    deleteSubCategoryValidator,
    deleteSubCategory,
  );
module.exports = router;
