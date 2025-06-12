import express from 'express';

import {registerUser,loginUser ,getAllUser,getCurrentUser  ,deleteUser, updateCurrentPassword, updateProfile, updateUserImg, uploadUserImg, logoutUser, deleteUserbyAdmin, getUserbyAdmin} from '../controllers/user.controller.js'
import {adminControl} from '../middlewares/adminControl.middlewares.js' 
import { upload } from '../middlewares/multer.middlewares.js'
import {authUser} from '../middlewares/auth.middlewares.js'

const userRouter = express.Router();

userRouter.route("/createAccount").post(registerUser)
userRouter.route("/allUser").get(authUser, adminControl ,getAllUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/updatePassword").put(authUser, updateCurrentPassword)
userRouter.route("/uploadUserProfileImg").post(authUser, upload.single("userImg") ,uploadUserImg)
userRouter.route("/updateProfileImg").put(authUser, upload.single("userImg") ,updateUserImg)
userRouter.route("/logout").post(authUser, logoutUser)
// userRouter.route("/uploadUserImg").post(authUser, upload.single("userImg") ,uploadUserImg)
userRouter.route("/deleteUser").delete(authUser, deleteUser)

userRouter.route("/updateProfile").put(authUser,  updateProfile)
userRouter.route("/getCurrentUser").get(authUser, getCurrentUser)
userRouter.route("/:id")
    .get(authUser,adminControl,getUserbyAdmin)
    .delete(authUser ,adminControl, deleteUserbyAdmin)

export default userRouter; 