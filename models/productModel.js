const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [3, 'Title must be at least 3 characters long'],
      maxLength: [100, 'Title must be at most 100 characters long'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [20, 'Description must be at least 20 characters long'],
      maxLength: [1000, 'Description must be at most 1000 characters long'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, 'Price is required'],
      max: [200000, 'Price must be at most 20 characters long'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: [true, 'Image cover is required'],
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
      set: val => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.pre(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' });
  next();
});

module.exports = mongoose.model('Product', productSchema);
