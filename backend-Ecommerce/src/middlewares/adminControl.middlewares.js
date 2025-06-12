import User from "../model/user.model.js";
import { asyncHandler } from '../utils/asyncHandler.utils.js'
import { ApiError } from '../utils/ApiError.utils.js'

export const adminControl = (asyncHandler(async(req,_,next)=>{
    const adminId = req?.authUser?._id

    if(!adminId) throw new ApiError(401 ,"eror, Login first to get admin Access")

    const user = await User.findById(adminId).select("-password -refreshToken")
    if(!user) throw new ApiError(401 ," admin not found")

    if(user.role !== 'admin')
        throw new ApiError(401 ," error, User is not a admin!")

    next()
}))