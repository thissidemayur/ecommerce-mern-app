// middlewares/error.middleware.js
import { ApiError } from "../utils/ApiError.utils.js";

export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Full Server Error:", err);
  // If it's an instance of your custom ApiError
  if (err instanceof ApiError) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err.error || [],
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error ",
    error: err.message || err,
  });
};
