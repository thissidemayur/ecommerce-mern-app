import mongoose, { model, Schema } from "mongoose";
import User from "./user.model.js";


const verificationSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"user must required for verification"]
    },
    purpose:{
        type:String,
        enum:["email" , "phoneNumber"],
        required:[true, "email||phone number must for verification"]
    },
    otpCode:{
        type:String,
        required:[true,"OTP is must"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:600 //TTL: document will auto-delete after 600s (10 minutes)
    }
})

const Verification = model("Verification",verificationSchema)
export default Verification