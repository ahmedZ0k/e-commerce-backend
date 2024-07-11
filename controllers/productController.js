const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");
const uploadImage = require("../middlewares/uploadImageMiddleware");

exports.uploadProductImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImage = expressAsyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.webp`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("webp")
      .webp({ quality: 90 })
      .toFile(`uploads/products/${imageCoverFileName}`);
    const imageCoverUrl = await uploadImage.uploadImageToCloudinary(
      req.files.imageCover[0]
    );
    req.body.imageCover = imageCoverUrl;
  }

  if (req.files.images) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (img, i) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${i + 1}.webp`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("webp")
          .webp({ quality: 90 })
          .toFile(`uploads/products/${imageName}`);

        req.body.images.push(imageName);
      })
    );
  }
  next();
});

// @desc    Create product
// @route   POST /api/products
// @access  Private

exports.createProduct = createOne(Product);

// @desc    Get all products
// @route   GET /api/products
// @access  Puplic

exports.getAllProducts = getAll(Product, "Product");

// @desc    Get Specific product
// @route   GET /api/products/:id
// @access  Puplic

exports.getProduct = getOne(Product, "reviews");

// @desc    Update product
// @route   PATCH /api/products/:id
// @access  Private

exports.updateProduct = updateOne(Product);

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private

exports.deleteProduct = deleteOne(Product);
