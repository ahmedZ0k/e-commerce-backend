const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: [true, 'subcategory must be unique'],
      minLength: [2, 'Too short subcategory name'],
      maxLength: [32, 'Too long subcategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to parent category'],
    },
  },
  { timestamps: true },
);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
