import express from "express";
const router = express.Router();
import Controller from "../controller/index.js"

//create admin
router.post('/create',Controller.registerAdmin);

//login 
router.post('/loginAdmin',Controller.loginAdmin);
//send otp
router.post('/sendOtp',Controller.sendRegisterOtp);

//verify otp & creat enew user
router.post('/register' , Controller.createUser);

//send otp for login
router.post('/otpLogin',Controller.sendOtpLogin);

//login user
router.post('/login',Controller.loginUser);




export default router;