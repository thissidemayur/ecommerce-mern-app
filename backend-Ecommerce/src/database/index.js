import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'
import dotenv from 'dotenv'

dotenv.config({ path:'./.env' }) //use to load env variable into process.env

const connectDB =async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        return connectionInstance
        // console.log("ConnectionInstance:: database->index.js:: ",connectionInstance.connection)
    } catch (error) {
        console.log("Error:: database->index.js:: ",error)
        process.exit(1) //why we are using process.exit(1)?
    }
}

export default connectDB



/**
 1 why we are using process.exit(1)
 */