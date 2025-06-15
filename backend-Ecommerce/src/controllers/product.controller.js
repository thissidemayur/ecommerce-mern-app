import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import Product from "../model/product.model.js";
import { v4 as uuidv4 } from "uuid";
import NodeCache from "node-cache";
import { uploadSingleImageOnCloudinary } from "../utils/cloudinary.utils.js";
import slugify from "slugify";
import mongoose from "mongoose";

// Initialize cache instance
const myCache = new NodeCache();

// -------------------------  Create a new product -------------------------
export const createProduct = asyncHandler(async (req, res) => {
  let {
    productName,
    aboutProduct,
    description,
    categories,
    variants,
    discountedPrice,
    isNewProduct,
    isFeatured,
    gender,
    brand,
    material,
    tags,
    discountPrice,
    subCategories,
  } = req.body;
  const productImg = req.files;

  // Check for missing fields
  if (
    !productName &&
    !aboutProduct &&
    !description &&
    !categories &&
    !variants &&
    !discountedPrice &&
    !isNewProduct &&
    !isFeatured &&
    !gender &&
    !brand &&
    !material &&
    !tags &&
    !discountPrice &&
    !subCategories
  )
    throw new ApiError(400, "all field are required!");

  categories = categories.toUpperCase();

  if (typeof variants === "string") {
    try {
      variants = JSON.parse(variants);
    } catch (error) {
      console.error(400, "Invalid variants format :: createProduct");

      throw new ApiError(error);
    }
  }
  if (typeof tags === "string") {
    try {
      // tags = JSON.parse(tags);
    } catch (error) {
      console.error(400, "Invalid tags format :: createProduct");

      throw new ApiError(error);
    }
  }
  let UpperSubCategories = subCategories.toUpperCase();

  if (!productImg || productImg.length < 1)
    throw new ApiError(400, "Product image is required.");

  if (productImg.length > 6)
    throw new ApiError(400, "You can only upload up to 6 images.");

  const cloudnaryImgResponse = await Promise.all(
    productImg?.map((img) => {
      try {
        const uploadOnCloudnary = uploadSingleImageOnCloudinary(img.path);
        return uploadOnCloudnary; // return the response of the image upload
      } catch (error) {
        console.error(
          "Error while uploading image at cloudinary :: createProduct"
        );
        throw new ApiError(500, error);
      }
    })
  );

  // Map product images to their details
  const productImgDetails = cloudnaryImgResponse.map((img) => ({
    productImg_id: uuidv4(),
    url: img.secure_url,
  }));

  // Create product in the database
  const productSent = await Product.create({
    productName,
    aboutProduct,
    description,
    categories,
    productImg: productImgDetails,
    categories,
    variants,
    discountedPrice,
    isNewProduct,
    isFeatured,
    gender, //unisex , male ,female
    brand,
    material,
    tag: tags,
    discountPrice,
    subCategories: UpperSubCategories,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, productSent, "Product added successfully!"));
});

// ------------------------- Update a product -------------------------
export const updateProduct = asyncHandler(async (req, res) => {
  let {
    productName,
    description,
    aboutProduct,
    categories,
    variants,
    discountedPrice,
    isNewProduct,
    isFeatured,
    gender,
    brand,
    material,
    tags,
  } = req.body;
  const { productId } = req.params; // productId
  let productPic = req.files;

  const hasUpdates =
    productName ||
    productPic?.length ||
    description ||
    aboutProduct ||
    categories ||
    discountedPrice ||
    typeof isNewProduct !== "undefined" ||
    typeof isFeatured !== "undefined" ||
    gender ||
    brand ||
    material ||
    tags ||
    variants;

  if (!hasUpdates)
    throw new ApiError(400, "No updates provided for the product!");

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid Product ID");
  }

  // variants = JSON.parse(variants);

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found!");

  // Update product details
  if (productName) {
    if (productName !== product.productName) {
      product.productName = productName;
      product.slug = slugify(productName, { lower: true });
    }
  }

  if (productPic.length > 0) {
    if (productPic !== product.productImg) {
      const uploadImgsOnCloudinary = await Promise.all(
        productPic?.map((img) => {
          try {
            return uploadSingleImageOnCloudinary(img);
          } catch (error) {
            console.error(error?.message || error);
            throw new ApiError(
              400,
              "Something went wrong while uploading productImg on cloudinary"
            );
          }
        })
      );
      if (!uploadImgsOnCloudinary)
        throw new ApiError(
          400,
          "something went wrong while uploading the product img in cloudinary"
        );

      product.productImg = uploadImgsOnCloudinary;
    }
  }
  if (description && description !== product.description)
    product.description = description;

  if (aboutProduct && aboutProduct !== product.aboutProduct)
    product.aboutProduct = aboutProduct;
  if (categories && categories !== product.categories)
    product.categories = categories;
  if (discountedPrice && discountedPrice !== product.discountedPrice)
    product.discountedPrice = discountedPrice;
  if (
    typeof isNewProduct !== "undefined" &&
    isNewProduct !== product.isNewProduct
  )
    product.isNewProduct = isNewProduct;
  if (typeof isFeatured !== "undefined" && isFeatured !== product.isFeatured)
    product.isFeatured = isFeatured;
  if (gender && gender !== product.gender) product.gender = gender;
  if (brand && brand !== product.brand) product.brand = brand;
  if (material && material !== product.material) product.material = material;
  // if (tags) product.tag = Array.isArray(tags) ? tags : [tags];

  if (variants && variants !== product.variants) {
    try {
      const parsedVariant =
        typeof variants === "string" ? JSON.parse(variants) : variants;
      if (Array.isArray(parsedVariant)) {
        product.variants = parsedVariant;
      } else {
        throw new Error("Variant must be an array.");
      }
    } catch (error) {
      throw new ApiError(400, "Invalid variant format. Must be JSON or array.");
    }
  }

  // Save updated product
  await product.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully!"));
});

//  ------------------------- Delete a product -------------------------
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  if (!productId) throw new ApiError(400, "Product ID is required!");

  await Product.findByIdAndDelete(productId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully!"));
});

// ------------------------- filtered product for user  -------------------------
export const getFilteredProductsForUsers = async (req, res) => {
  try {
    // Destructure query parameters
    const {
      categories,
      price,
      sort,
      search,
      gender,
      subCategories,
      size,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {}; // Query object for MongoDB

    //
    // 🔎 Build the filter conditions based on query parameters
    //

    if (gender) query.gender = gender;

    if (categories) query.categories = categories;

    if (subCategories) query.subCategories = subCategories;

    // Match on size and/or price inside `variants` array
    if (size || price) {
      query.variants = {
        $elemMatch: {
          ...(size && { size }),
          ...(price && { price: { $lte: Number(price) } }),
        },
      };
    }

    // Full-text search using $text (only works if index is defined)
    if (search) {
      query.$text = { $search: search };
    }

    //
    // 🔀 Define sort options
    //

    const sortOption =
      sort === "asc"
        ? { "variants.price": 1 } // Sort by price ascending
        : sort === "desc"
        ? { "variants.price": -1 } // Sort by price descending
        : { createdAt: -1 }; // Default: newest products first

    //
    // 🧮 Pagination logic
    //
    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Number(limit);
    const skip = (currentPage - 1) * itemsPerPage;

    //
    // 📤 Fetch filtered and sorted products from the database
    //
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage)
      .select("productName brand discountedPrice createdAt productImg variants") // Optional: limit returned fields
      .lean(); // Return plain JS objects, not Mongoose documents

    // Get total number of matching products for pagination
    const totalProductCount = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProductCount / itemsPerPage);

    // Handle no products found
    if (!products.length) {
      return res.status(404).json({ message: "No products found!" });
    }

    //
    // ✅ Send response with products and pagination info
    //
    res.status(200).json({
      status: 200,
      products,
      pagination: {
        totalProducts: totalProductCount,
        totalPages,
        currentPage,
      },
    });
  } catch (error) {
    console.error(
      "Error fetching products:: getFilteredProductForUsers: ",
      error.message
    );
    res
      .status(500)
      .json({ message: "Server Error at ::getFilteredProductForUsers" });
  }
};

// ------------------------- Get single product details -------------------------
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  let product;

  if (!productId) {
    console.log("productId: ", productId);
    throw new ApiError(400, "Product ID is required in the route!");
  }

  product = await Product.findById(productId).lean();
  if (!product) throw new ApiError(404, "Product not found in the database!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Product details retrieved successfully!")
    );
});

// ------------------------- Get latest products -------------------------
export const getRecentlyAddedProducts = asyncHandler(async (_, res) => {
  let latestProduct;

  latestProduct = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .select("productName productImg variants gender ")
    .lean();
  if (!latestProduct) throw new ApiError(404, "No latest products found!");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        latestProduct,
        "Latest products retrieved successfully!"
      )
    );
});

// ------------------------- Get latest products by admin choice -------------------------
export const getAdminSelectedNewProducts = asyncHandler(async (_, res) => {
  let latestProduct;

  latestProduct = await Product.find({ isNewProduct: true })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("productName productImg discountedPrice variants")
    .lean();
  if (!latestProduct) throw new ApiError(404, "No latest products found!");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        latestProduct,
        "Latest products retrieved successfully!"
      )
    );
});

// ------------------------- Get featured products -------------------------
export const getFeaturedProducts = asyncHandler(async (_, res) => {
  let latestProduct;

  latestProduct = await Product.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("productName productImg discountedPrice createdAt variants")
    .lean();
  if (!latestProduct) throw new ApiError(404, "No latest products found!");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        latestProduct,
        "Latest products retrieved successfully!"
      )
    );
});

// ------------------------- Get all categories -------------------------
export const getAllCategories = asyncHandler(async (req, res) => {
  let allCategories;

  allCategories = await Product.distinct("categories");
  if (!allCategories) throw new ApiError(404, "No categories found!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, allCategories, "Categories retrieved successfully!")
    );
});

// ------------------------- Get all subcategories with gender  and categories -------------------------
export const getSubCategoriesWithGender = asyncHandler(async (req, res) => {
  let { gender, subCategory, category } = req.body;

  try {
    if (!gender) throw new ApiError(400, "gender should be present");
    subCategory = subCategory?.toUpperCase();
    category = category?.toUpperCase();
    const queryObject = {
      gender,
    };

    if (category) queryObject.categories = category;

    if (subCategory)
      queryObject.subCategories = { $in: [].concat(subCategory) };

    const product = await Product.find(queryObject)
      .select(
        "productName productImg categories subCategories gender variants slug"
      )
      .lean();

    if (!product.length) {
      console.error("No product found ::getSubCategoriesWithGender");
      throw new ApiError(
        404,
        `No products found for ${gender}'s ${subCategory} `
      );
    }

    // const totalDocument = await Product.countDocuments(queryObject);

    return res.status(200).json(
      new ApiResponse(
        200,
        product,
        // totalProduct:{totalProduct: totalDocument},
        "Products retrieved successfully!"
      )
    );
  } catch (error) {
    console.error(
      "Error fetching products:: getSubCategoriesWithGender = ",
      error.message
    );
    res
      .status(500)
      .json({ message: "Server Error::getSubCategoriesWithGender= " });
  }
});

// ------------------------- Get all subcategories of categories -------------------------
export const getSubCategoriesByCategory = asyncHandler(async (req, res) => {
  let { category } = req.body;
  if (!category) {
    throw new ApiError(400, "Category is required");
  }
  const result = await Product.aggregate([
    { $match: { categories: category.toUpperCase() } },
    { $unwind: "$subCategories" },
    {
      $group: { _id: null, allSubCategories: { $addToSet: "$subCategories" } },
    },
    { $project: { _id: 0, allSubCategories: 1 } },
  ]);

  if (!result?.length) {
    throw new ApiError(404, "No subcategories found for this category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, result[0].allSubCategories, "Subcategories fetched")
    );
});

//------------------------- Get admin products -------------------------
export const getProductsForAdminDashboard = asyncHandler(async (_, res) => {
  let adminProduct;

  adminProduct = await Product.find({}).lean();
  if (!adminProduct)
    throw new ApiError(404, "No products found. Please add products.");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        adminProduct,
        "Admin products retrieved successfully!"
      )
    );
});

// Helper function to delete product-related cache
function deleteProductCache(productId = undefined) {
  myCache.del([
    "adminProductCache",
    "allCategoriesCache",
    "latestProductCache",
    "allProductCache",
  ]);
  if (productId) {
    let deleteCache = [];
    if (typeof productId === "string")
      deleteCache.push(`singleProductCache-${productId}`);
    if (Array.isArray(productId)) productId.forEach((i) => deleteCache.push(i));

    myCache.del(deleteCache);
  }
}
