import  { model, Schema } from "mongoose";

const coupanSchema = new Schema({
    code:{
        type:String ,
        required:[true , "Please enter the COUPAN code"],
        unique:true
    },
    amount:{
        type:String,
        required:[true, "Please enter amount for coupan!"]
    }
},
{timestamps:true}
)

const Coupan = model("Coupan" , coupanSchema)

export default Coupan
