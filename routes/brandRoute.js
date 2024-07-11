const express = require('express');

const {
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
} = require('../utils/validatores/brandValidator');

const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require('../controllers/brandController');

const { protect, allowedTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllBrands)
  .post(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand,
  );

router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .patch(
    protect,
    allowedTo('admin', 'manager'),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand,
  )
  .delete(protect, allowedTo('admin'), deleteBrandValidator, deleteBrand);

module.exports = router;
