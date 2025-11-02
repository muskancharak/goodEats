import { SUCCESS } from "../messages/index.js"
import service from '../service/index.js';
import { validateUser } from "../validation/validation.js";

import { errorResponse, successResponse } from "../utils/response.js";

//admin create
export const registerAdmin = async(req,res) => {
    try {
        const admin = await service.user.createAdmin();
        successResponse(res,admin,SUCCESS.USER_REGISTERED)
    } catch (error) {
        errorResponse(res, error)
    }
};

//login admin
export const loginAdmin = async(req,res) => {
    const { email, password } = req.body;
    try {
        const admin = await service.user.adminLogin({email,password});
        successResponse(res,admin ,SUCCESS.LOGIN_SUCCESS)
    } catch(error) {
        errorResponse(res,error)
    }
};

//send otp for new user
export const sendRegisterOtp = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return errorResponse(res, error);
    }
    try {
        const { userName, email, phoneNumber , password } = req.body;
        const user = await service.user.OtpForsignUp({ userName, email, phoneNumber ,password});
        successResponse(res, user, SUCCESS.OTP_SENT)
    } catch (error) {
        errorResponse(res, error)
    }
};
//create user

export const createUser = async (req, res) => {
    try {
        const user = await service.user.registerUser(req.body);
        successResponse(res, user, SUCCESS.USER_REGISTERED)
    } catch (error) {
        errorResponse(res, error)
    }
};

//send otp for login
export const sendOtpLogin = async (req, res) => {
    try {
        const { phoneNumber ,password} = req.body;
        console.log("req.body:", req.body);
        const user = await service.user.loginOtp({ phoneNumber ,password});
        successResponse(res, user, SUCCESS.OTP_SENT);
    } catch (error) {
        errorResponse(res, error)
    }
};

//login user
export const loginUser = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const user = await service.user.login({ phoneNumber, otp });
        console.log(req.body)
        successResponse(res, user, SUCCESS.LOGIN_SUCCESS)
    } catch (error) {
        errorResponse(res, error)
    }
};