import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { uploadSingleImageOnCloudinary } from "../utils/cloudinary.utils.js";
import User from "../model/user.model.js";

// ------------------------- generateAccessAndRefreshToken -------------------------
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user)
      throw new ApiError(404, "User not found while generating tokens");

    if (typeof user.generateRefreshToken !== "function")
      throw new ApiError("refreshToken is not a function");
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    if (!refreshToken)
      throw new ApiError(
        400,
        "error while genereating refresh token in fn generateAccessAndRefreshToken!"
      );
    if (!accessToken)
      throw new ApiError(
        400,
        "error while generating access token in fn generateAccessAndRefreshToken!"
      );
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    console.error("error in generateAccessAndRefreshToken(): ", error);
    console.error("❌ Token Generation Error:", error.message);
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

// ------------------------- register new user -------------------------
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      purpose,
      identifer,
      password,
      dob,
      gender,
      role,
    } = req.body;

    if (!firstName) throw new ApiError(400, "first name is not present!");
    if (!lastName) throw new ApiError(400, "last name is not present!");
    if (!purpose) throw new ApiError(400, "purpose is not present!");
    if (!password) throw new ApiError(400, "password is not present!");
    if (!identifer) throw new ApiError(400, "identifieris not present!");
    if (!gender) throw new ApiError(400, "gender is not present!");
    if (!dob) throw new ApiError(400, "dob is not present");

    const existedUser = await User.findOne({
      $or: [{ email: identifer }, { phoneNumber: identifer }],
    });

    if (existedUser) {
      if (purpose === "email")
        throw new ApiError(401, `user with ${identifer} already existed!`);
      if (purpose === "phoneNumber")
        throw new ApiError(401, `user with ${identifer} already existed!`);
    }

    let phoneNumber = undefined;
    let email = undefined;

    if (purpose === "email") email = identifer;
    else if (purpose === "phoneNumber") phoneNumber = identifer;
    else
      throw new ApiError(
        400,
        "Purpose should be either 'email' or 'phoneNumber'"
      );

    // Check if both email and phoneNumber are null
    if (email === null && phoneNumber === null) {
      throw new ApiError(400, "Either email or phone number must be provided.");
    }

    const user = await User.create({
      firstName,
      lastName,
      email: email,
      phoneNumber: phoneNumber,
      gender,
      dob: new Date(dob),
      role,
      password,
    });

    if (!user) throw new ApiError(401, "user not created! ");

    const userDetail = await User.findById(user._id);

    if (!userDetail)
      throw new ApiError("something went wrong while registering user!");

    return res
      .status(200)
      .json(new ApiResponse(200, userDetail, "user created Successfully"));
  } catch (error) {
    console.error("🛑 Error in registerUser:", error);
    throw error; // Pass error to the global handler
  }
});

//  ------------------------- login user -------------------------
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { identifer, password } = req.body;
    if (!identifer && !password)
      throw new ApiError(400, "email and password both are missing");

    const user = await User.findOne({
      $or: [{ email: identifer }, { phoneNumber: identifer }],
    });

    if (!user) throw new ApiResponse("User not found!");

    const verifyPassword = await user.validatePassword(password);
    if (!verifyPassword) throw new ApiError(400, "wrong password");

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const respondedUser = user.toObject();
    delete respondedUser.password;
    delete respondedUser.refreshToken;

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, respondedUser, "user login successfully!"));
  } catch (error) {
    console.error("🛑 Error in loginUser:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- logout user -------------------------
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    const userId = req?.authUser?._id;
    await User.findByIdAndUpdate(
      userId,
      {
        $unset: { refreshToken: 1 },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    return res
      .cookie("refreshToken", options)
      .cookie("accessToken", options)
      .json(new ApiResponse(200, {}, "logout successfully!"));
  } catch (error) {
    console.error("🛑 Error in logoutUser:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- delete user(by userItself) -------------------------
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const id = req?.authUser?._id;
    const { password } = req.body;
    if (!password) throw new ApiError(400, "Password must be present!");
    if (!id) throw new ApiError(401, "userId not found in fn deleteUser()");

    const user = await User.findById(id);
    const validatePassword = await user.validatePassword(password);
    if (!validatePassword) throw new ApiError(400, "wrong password!");

    if (!user) throw new ApiError(401, "User not found");

    const deleteUser = await user.deleteOne();
    if (deleteUser.deletedCount === 0)
      throw new ApiError(500, "User is not deleted from database!");
    return res
      .status(200)
      .json(new ApiResponse(200, deleteUser, "Successfully user deleted!"));
  } catch (error) {
    console.error("🛑 Error in deleteUser:", error);
    throw error; // Pass error to the global handler
  }
});

// -------------------------  get current user(by itself) -------------------------
export const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    const userId = req?.authUser?._id;
    if (!userId)
      throw new ApiError(
        400,
        "access token is not present in fn getCurrentUser()"
      );

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!userId) throw new ApiError(400, "user not found");

    return res.status(200).json(new ApiResponse(200, user, "user is present"));
  } catch (error) {
    console.error("🛑 Error in getCurrentUser:", error);
    throw error; // Pass error to the global handler
  }
});

//  ------------------------- get currentUser (by admin) -------------------------
export const getUserbyAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      throw new ApiError(
        400,
        "access token is not present in fn getCurrentUser()"
      );
    const user = await User.findById(id).select("-password -refreshToken");
    if (!id) throw new ApiError(400, "user not found");

    return res.status(200).json(new ApiResponse(200, user, "user is present"));
  } catch (error) {
    console.error("🛑 Error in getUserByAdmin:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- get deleteUser (by admin) -------------------------
export const deleteUserbyAdmin = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      throw new ApiError(
        400,
        "deletedUserId is not present in fn getCurrentUser()"
      );
    const user = await User.findById(id).select("-password -refreshToken");
    if (!id) throw new ApiError(400, "user not found");

    return res.status(200).json(new ApiResponse(200, user, "user is present"));
  } catch (error) {
    console.error("🛑 Error in deleteUserByAdmin:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- updated user Password -------------------------
export const updateCurrentPassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) throw new ApiError(400, "old password is not present");
    console.log("req.body passwprd: ", req.body);
    const userId = req?.authUser?._id;

    const user = await User.findById(userId);
    if (!user) throw new ApiError(400, "unauthorized user(user not found)");

    const checkPassword = await user.validatePassword(oldPassword);
    if (!checkPassword) throw new ApiError(400, "incorrect old password ");
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "password change successFully!"));
  } catch (error) {
    console.error("🛑 Error in updateCurrentPassword:", error);
    throw error; // Pass error to the global handler
  }
});

// -------------------------  updated user  Profile -------------------------
export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { gender, dob, phoneNumber, email, firstName, lastName } = req.body;
    // console.log("datatype dob: ",typeof dob)
    // console.log("req.body: ",req.body)
    // console.log("ID: ",req?.authUser?._id)
    // console.log("ID DATATYPE: ",typeof req?.authUser?._id)

    const fieldsToUpdate = {
      gender,
      dob,
      phoneNumber,
      email,
      firstName,
      lastName,
    };
    const hasUpdates = Object.values(fieldsToUpdate).some(Boolean);
    if (!hasUpdates)
      throw new ApiError(400, "At least one field must be present to update!");

    const userId = await req?.authUser?._id;
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) throw new ApiError(400, "User not found!");

    if (gender && gender !== user.gender) user.gender = gender;
    if (dob && new Date(dob).toISOString() !== user.dob.toISOString()) {
      user.dob = new Date(dob);
    }

    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) throw new ApiError(409, "phoneNumber  already in use!");
      user.phoneNumber = phoneNumber;
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new ApiError(409, "Email already in use!");
      user.email = email;
    }
    if (firstName && firstName !== user.firstName) user.firstName = firstName;
    if (lastName && lastName !== user.lastName) user.lastName = lastName;

    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "updating  data successfully!"));
  } catch (error) {
    console.error("🛑 Error in updateUser:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- add  userImg -------------------------
export const uploadUserImg = asyncHandler(async (req, res) => {
  try {
    const localPath = req?.file?.path;
    console.log("localpath: ", localPath);
    if (!localPath) throw new ApiError(400, "userImg file is not present");
    const cloudnaryImg = await uploadSingleImageOnCloudinary(localPath);

    if (!cloudnaryImg.secure_url)
      throw new ApiError(
        400,
        "something went wrong while uploading user img on cloudnary"
      );

    const userUploadedImg = await User.findByIdAndUpdate(
      req?.authUser?._id,
      {
        $set: {
          userImg: cloudnaryImg.url,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          userUploadedImg,
          "uploading user imag is successfull"
        )
      );
  } catch (error) {
    console.error("🛑 Error in uploadUserImg:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- update userImg -------------------------
export const updateUserImg = asyncHandler(async (req, res) => {
  try {
    const localFilePath = req?.file?.path;
    if (!localFilePath)
      throw new ApiError("upload image to update existing user img");

    const cloudnaryResponse = await uploadSingleImageOnCloudinary(
      localFilePath
    );
    if (!cloudnaryResponse.url)
      throw new ApiError(
        400,
        "something went wrong while uploading user image on cloudinary"
      );
    // TODOS: DELETE OLD IMAGE
    const updatedUserImg = await User.findByIdAndDelete(
      req?.authUser?._id,
      {
        $set: {
          userImg: cloudnaryResponse.url,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshToken");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedUserImg,
          "Avatar image updated successfully"
        )
      );
  } catch (error) {
    console.error("🛑 Error in updateUserImg:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- get all user -------------------------
export const getAllUser = asyncHandler(async (_, res) => {
  try {
    const allUser = await User.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, allUser, "all user get succefully"));
  } catch (error) {
    console.error("🛑 Error in getAllUser:", error);
    throw error; // Pass error to the global handler
  }
});

// ------------------------- refresh the accessToken -------------------------
export const refresh_the_accessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    console.error("🛑 Error in refresh_the_accessToken:", error);
    throw error; // Pass error to the global handler
  }
});
