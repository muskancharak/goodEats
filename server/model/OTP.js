import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    phoneNumber : {
       type : String,
       
    },
    email : {
        type : String,
        
    },
    userName : {
        type : String,
        
    },
     otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    password : {
        type : String
    }
},{timestamps : true});

const OTP = mongoose.model('OTP',otpSchema);

export default OTP;