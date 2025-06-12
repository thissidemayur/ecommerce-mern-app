import { NODEMAILER_EMAIL_PASSWORD, NODEMAILER_EMAIL_USER, TWILIO_MESSAGE_SERVICE_SID, TWILIO_SENDER_PHONE_NUMBER, TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN } from "../config.js";
// const client = require('twilio')(TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN);
import twillio  from 'twilio'
const client = twillio(TWILLIO_ACCOUNT_SID, TWILLIO_AUTH_TOKEN)
import nodemailer from 'nodemailer'
import { ApiError } from "./ApiError.utils.js";



export const sendEmail = async (reciverEmail, message) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_EMAIL_USER, 
        pass: NODEMAILER_EMAIL_PASSWORD, 
      },

    });
  
    const mailOptions = {
      from: `"Your App" <${NODEMAILER_EMAIL_USER}>`,
      to:reciverEmail,
      subject: 'Your OTP Code ',
      text: message,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${reciverEmail} successfully`);
    } catch (error) {
      console.error("error in sendMail(): ",error)
      console.error(`❌ Error sending email: ${error.message}`);
      throw new ApiError(400,"error in sendMail")
    }
  };


  
export const sendSMS = async(phoneNumber, message) => {

    try {
        const response=await client.messages
        .create({
            body: message,
            messagingServiceSid: TWILIO_MESSAGE_SERVICE_SID,
            to: parseInt(`+91${phoneNumber}`),
            from:TWILIO_SENDER_PHONE_NUMBER
        })

        console.log(`✅ SMS sent: `,JSON.stringify(response, null ,2))
    } catch (error) {
        console.error(`❌ Failed to send SMS: ${error.message}`);
        throw new Error('SMS sending failed');
    }
    
}

