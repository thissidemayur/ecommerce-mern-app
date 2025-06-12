import { Router } from "express";
import { authUser } from "../middlewares/auth.middlewares.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getFilteredProductsForUsers,
  // getlatestProducts,
  getAllCategories,
  getProductsForAdminDashboard,
  getRecentlyAddedProducts,
  getAdminSelectedNewProducts,
  getFeaturedProducts,
  getSubCategoriesWithGender,
  getSubCategoriesByCategory,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { adminControl } from "../middlewares/adminControl.middlewares.js";

const productRouter = Router();

// ✅ All STATIC routes come first
productRouter
  .route("/createProduct")
  .post(authUser, adminControl, upload.array("productImg", 6), createProduct);

productRouter.route("/allProduct").get(getFilteredProductsForUsers);
productRouter.route("/latestProduct").get(getRecentlyAddedProducts);
productRouter.route("/adminLatestProduct").get(getAdminSelectedNewProducts);
productRouter.route("/allCategories").get(getAllCategories);
productRouter.route("/allAdminProduct").get(getProductsForAdminDashboard);
productRouter.route("/allSubCategories").post(getSubCategoriesByCategory);
productRouter.route("/featuredProduct").get(getFeaturedProducts);
productRouter
  .route("/getProductBySubCategory")
  .post(getSubCategoriesWithGender);

// ✅ DYNAMIC routes come AFTER all static routes
productRouter
  .route("/updatedProduct/:productId")
  .put(authUser, adminControl, upload.array("productImg", 6), updateProduct);

productRouter
  .route("/:productId")
  .get(getSingleProduct)
  .delete(authUser, adminControl, deleteProduct);

export default productRouter;
