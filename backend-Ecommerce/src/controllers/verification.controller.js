import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { sendEmail, sendSMS } from "../utils/notifer.utils.js";
import User from "../model/user.model.js";
import Verification from "../model/verification.model.js";

// ------------------------- generateOtpCode -------------------------
const generateOTPcode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

//  -------------------------user request otp to verifiy its Id; -------------------------
export const requestVerification = asyncHandler(async (req, res) => {
  try {
    const { identifier, purpose } = req.body;
    //identifer ->[phone || email]  ;  purpose->[emailId(mayur@gmail.com) || phoneNum:6283908732]

    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!user) throw new ApiError(404, "User not found");
    const otpCode = generateOTPcode();

    await Verification.create({
      userId: user._id,
      purpose,
      otpCode,
    });
    if (purpose === "email")
      await sendEmail(
        user.email,
        `Dear ${user.firstName}, <br/>Your email OTP is ${otpCode} `
      );
    else if (purpose === "phoneNumber")
      await sendSMS(
        user.phoneNumber,
        `Dear ${user.firstName}, <br/>Your Mobile Number OTP is ${otpCode} `
      );

    return res
      .status(200)
      .json(new ApiResponse(200, null, "verification code is sent"));
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw new ApiError(400, "error in requestVerification()'s catch block");
  }
});

// ------------------------- verify OTP -------------------------
export const verifiyOTP = asyncHandler(async (req, res) => {
  try {
    const { otpCode, identifier, purpose } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!user) throw new ApiError(404, "User not found in fn verifyOTP() !!");

    const matchOtp = await Verification.findOne({
      userId: user._id,
      otpCode,
      purpose,
    });

    if (!matchOtp) throw new ApiError("Invalid or Expired OTP code");

    if (purpose === "email") user.emailVerified = true;
    else if (purpose === "phoneNumber") user.phoneNumberVerified = true;
    await user.save({ validateBeforeSave: false });

    await Verification.deleteMany({ userId: user._id, purpose, otpCode }); //cleanup

    return res
      .status(200)
      .json(new ApiResponse(201, `${purpose} verified sucsexfully! `));
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw new ApiError(400, "error in verifiyOTP()'s catch block");
  }
});
