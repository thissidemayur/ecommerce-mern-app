import {Router} from 'express'
import {adminControl} from '../middlewares/adminControl.middlewares.js' 
import { upload } from '../middlewares/multer.middlewares.js'
import { requestVerification, verifiyOTP } from '../controllers/verification.controller.js'


const verificationRouter = Router()

verificationRouter.route("/otpSent").get(requestVerification)
verificationRouter.route("/verifyOtp").post(verifiyOTP)


export default verificationRouter