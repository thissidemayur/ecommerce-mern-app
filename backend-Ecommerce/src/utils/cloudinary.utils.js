import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDNARY_API_KEY,
  CLOUDNARY_API_SECREAT,
  CLOUDNARY_CLOUD_NAME,
} from "../config.js";
import fs from "fs/promises";
import { ApiError } from "./ApiError.utils.js";
cloudinary.config({
  cloud_name: CLOUDNARY_CLOUD_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECREAT,
});

export const uploadSingleImageOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new ApiError(400, "does not upload on cloudnary");
    const response = await cloudinary.uploader.upload(localFilePath);
    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    try {
      await fs.unlink(localFilePath);
    } catch (unlinkErr) {
      console.error("Failed to delete file after error:", unlinkErr);
    }

    console.error("Cloudinary upload error:", error);
    throw new Error(error);
  }
};
