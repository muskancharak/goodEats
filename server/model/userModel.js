import mongoose from "mongoose";
import { CONSTANTS } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    role:{
        type : String,
        enum : Object.values(CONSTANTS.ROLE),
        default : CONSTANTS.ROLE.USER
    },
   password : {
        type : String,
        
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;