import mongoose,{Schema} from 'mongoose'
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, BCRYPT_SALT_ROUND, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from '../config.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'


const userSchema = new Schema({

    firstName: {
        type: String,
        required: [true, "first Name is required!"],
        lowercase: true,
        trim: true,
        index: true
    },

    lastName: {
        type: String,
        required: [true, "first Name is required!"],
        lowercase: true,
        trim: true,
    },

    email: {
        type: String,
        sparse:true,
        unique: true,
        trim: true,
        lowercase: true,
        index:true,
    },
    emailVerified:{
        type:Boolean,
        default:false,
        
    },
    phoneNumber:{
        type:String,
        unique: true,
        trim: true,
        lowercase: true,
        index:true,
        sparse:true,
    },
    phoneNumberVerified:{
        type:Boolean,
        default:false
    },
    
    password:{
        type: String,
        required:[true, 'password is required']
    },
    refreshToken:{
        type:String
    }
    ,
    dob: {
        type: Date,
        required: [true, "Date of Birth is required!"]
    },
    gender: {
        type: String,
        enum:["male","female"],
        required: [true, "Gender is required!"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    userImg:{
        type:String
    }


}, { timestamps: true , toObject:{virtuals:true}, toJSON:{virtuals:true} }) // ✅ Enable virtuals in .toObject() , Also useful for API responses

// set virtual field : age
userSchema.virtual("age").get(function() {
    let presentDate = new Date()
    let dob = this.dob
    let age = presentDate.getFullYear() - dob.getFullYear()
    if (presentDate.getMonth() < dob.getMonth() || (presentDate.getMonth() === dob.getMonth() && presentDate.getDate() < dob.getDate()))
        age--
    return age
})

// set virtual field: fullName
userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

// converting password into hash password and store that hash password in db
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,BCRYPT_SALT_ROUND);
    next();
})

// validate password
userSchema.methods.validatePassword =async function (password){
    return await bcrypt.compare(password,this.password)
}

// genereate access token
userSchema.methods.generateAccessToken = function (){
    const userObject = this.toObject({virtuals:true})
     return  jwt.sign({
        data: {
            phoneNumber:userObject.phoneNumber,
            email:userObject.email,
            fullName:userObject.fullName,
            userImg:userObject.userImg,
            _id:userObject._id, 
        } 
      }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY});
}

// genereate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        data: {
            _id:this._id, 
        }
      }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY});
}



const User = mongoose.model("User", userSchema)
export default User