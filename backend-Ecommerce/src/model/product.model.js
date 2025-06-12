// models/product.model.js
import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

// Sub-schema for product variants (e.g., size, color, price)
const variantSchema = new Schema({
  size: String,
  color: String,
  price: Number,
  stock: { type: Number, default: 0 },
});

// Main product schema
const productSchema = new Schema(
  {
    // Product name (required, lowercase for consistency)
    productName: {
      type: String,
      required: [true, "please enter product name!"],
      lowercase: true,
    },

    // Array of image objects for the product
    productImg: [
      {
        productImg_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    // Target gender for the product
    gender: {
      type: String,
      enum: ["men", "women", "unisex"],
    },

    // Description of the product (required)
    description: {
      type: String,
      required: [true, "please enter description of product!"],
      lowercase: true,
    },

    // Additional info
    aboutProduct: { type: String, lowercase: true },

    // Category and subcategory for filtering
    categories: { type: String, required: true },
    subCategories: [String],

    // Optional metadata
    brand: { type: String, lowercase: true },
    material: { type: String, lowercase: true },
    tag: [String],

    // URL-friendly identifier
    slug: { type: String, unique: true, lowercase: true },

    // Variants (e.g., size, color, price)
    variants: [variantSchema],

    // Special flags
    isFeatured: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },

    // Discounted price if applicable
    discountedPrice: Number,
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create a slug from the _id before saving
productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this._id.toString(), { lower: true });
  }
  next();
});

//
// Indexes for performance
//

// 🔍 Full-text index for search across multiple fields
productSchema.index({
  productName: "text",
  description: "text",
  tag: "text",
  brand: "text",
});

// 🚀 Compound index for filtering
productSchema.index({ gender: 1, categories: 1, subCategories: 1 });

// 📈 Index for filtering and sorting by variants
productSchema.index({ "variants.size": 1, "variants.price": 1 });

// 🕓 Index for sorting by creation time
productSchema.index({ createdAt: -1 });

// 🏷️ Index for featured/new products
productSchema.index({ isFeatured: 1, isNewProduct: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
