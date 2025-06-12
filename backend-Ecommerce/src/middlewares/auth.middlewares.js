import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { ApiError } from '../utils/ApiError.utils.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from "../model/user.model.js";
import {ACCESS_TOKEN_SECRET} from '../config.js'


export const authUser = asyncHandler(async (req, _, next) => {
    try {
      const cookieToken = req.cookies?.accessToken;
      const headerToken = req.headers?.authorization?.replace("Bearer ", "");
  
      // console.log("🔐 Cookie Token:", cookieToken);
      // console.log("🔐 Header Token:", headerToken);
  
      const token = cookieToken || headerToken;
      // console.log("token: ",token)
      if (!token || typeof token !== 'string') {
        console.warn("❌ No valid token found.");
        throw new ApiError(401, "Unauthorized: No valid token provided");
      }
  
      const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

      // console.log("decodedToken: ",decodedToken)
      // const userId = new mongoose.Types.ObjectId(decodedToken.data._id);
      // console.log("userId: ",userId)
      // console.log("datatype userId: ",typeof decodedToken.data._id)

      const user = await User.findById(decodedToken.data._id).select("-refreshToken -password");
      // console.log("user: ",user)
      if (!user) throw new ApiError(404, "User not found");
  
      req.authUser = user;
      next();
    } catch (error) {
      console.error("❌ error in authUser:", error);
      throw new ApiError(401, "Invalid access token in authMiddleware");
    }
  });
  