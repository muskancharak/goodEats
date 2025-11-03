import { generateToken } from "../Middleware/auth.js";
import Model from "../model/index.js";
import service from "./index.js";
import bcrypt from "bcrypt";

//createAdmin
 export  const createAdmin = async () => {
  const existingAdmin = await Model.User.findOne({ role: "ADMIN" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Model.User({
      userName,
      email,
      password: hashedPassword,
      role: "ADMIN",
      phoneNumber,
    });
    await admin.save();
    console.log("✅ Admin created:", admin.email);
  } else {
    console.log("Admin already exists.");
  }
};


// ✅ Admin Login
export const adminLogin = async({email , password ,role}) => {
  console.log(email)
  try {

    // Find admin
    const user = await Model.User.findOne({ 
  email, 
  role: { $in: ["ADMIN", "SELLER"] } 
});
    console.log(email ,role)
    if (!user){
      throw new Error("not authorized")
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      throw new Error("invalid password")
    }

    // Create JWT
    const token = generateToken(user._id,user.role);
      console.log("Token generated:", token);
    
    return { user , token};

  } catch (error) {
    console.log("error in admin login", error);
    throw error;
  }
}


//send otp
export const sendOtp = async (data) => {
  const { phoneNumber, email, userName } = data;
  try {
    // Check existing OTP
    const existOtp = await Model.OTP.findOne({ phoneNumber });
    if (existOtp && existOtp.expiresAt > Date.now()) {
      return {
        otp: existOtp.otp,
        message: "OTP already sent to this number",
        existing: true
      };
    }

    // Delete old OTP if exists
    await Model.OTP.deleteOne({ phoneNumber });

    // Generate new OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save OTP to DB
    const newOtp = new Model.OTP({
      phoneNumber,
      userName,
      email,
      otp,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes
    });
    await newOtp.save();

    return { otp };
  } catch (error) {
    console.error("Error in sending OTP:", error);
    throw error
  }
};


//verify otp
export const verifyOtp = async ({ phoneNumber, otp }) => {
  try {
    if (!phoneNumber || !otp) {
      throw new Error("Phone number and OTP are required");
    }

    const existOtp = await Model.OTP.findOne({ phoneNumber });
    if (!existOtp) {
      throw new Error("OTP not found or expired");
    }

    // Check if expired
    if (existOtp.expiresAt < Date.now()) {
      await Model.OTP.deleteOne({ phoneNumber });
      throw new Error("OTP expired. Please request a new one.");
    }

    // Verify OTP match
    if (existOtp.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    // ✅ OTP is correct — delete it
    await Model.OTP.deleteOne({ phoneNumber });

    return { success: true, message: "OTP verified successfully" };

  } catch (error) {
    console.log("Error verifying OTP:", error);
    throw error;
  }
};


//signup
export const OtpForsignUp = async ({ userName, email, phoneNumber , password }) => {

  try {
    if (!userName || userName.trim() === "") {
      throw new Error("Username cannot be empty");
    }

    if (!email || email.trim() === "") {
      throw new Error("Email cannot be empty");
    }

    if (!phoneNumber || phoneNumber.trim() === "") {
      throw new Error("Phone number cannot be empty");
    }
    const existEmail = await Model.User.findOne({ email });
    if (existEmail) {
      throw new Error("email already exist");
    };
    const existNumber = await Model.User.findOne({ phoneNumber });
    if (existNumber) {
      throw new Error("phone already exist")
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    //send otp
    const otpResponse = await service.user.sendOtp({ phoneNumber, userName, email ,password : hashedPassword});
    console.log("otp response")
    console.log("send otp", otpResponse);
    ;
    console.log("sen otp working")

    if (!otpResponse || !otpResponse.otp) {
      throw new Error("No OTP returned from sendOtp()");
    }
    const otp = otpResponse.otp;

    //save otp
    await Model.OTP.findOneAndUpdate(
      { phoneNumber },
      { phoneNumber, otp, userName, email , password:hashedPassword },
      { upsert: true, new: true }
    );
    console.log(hashedPassword)
    return { otp, userName, email, phoneNumber ,password:hashedPassword}
    
  } catch (error) {
    console.log("Error in sending otp", error);
    throw error; 
  }
};

// verify otp and register user
export const registerUser = async ({ phoneNumber, otp }) => {
  try {
    const existUser = await Model.User.findOne({ phoneNumber });
    if (existUser) {
      console.log("number already register");
      throw new error("number already exist")
    }
    //find otp
    const record = await Model.OTP.findOne({ phoneNumber });
    if (!record) {
      console.log("invalid otp");
      throw new Error("invalid otp");
    }
    //check otp exiry
    if (record.expiresAt < Date.now()) {
      await Model.OTP.deleteOne({ phoneNumber });
      throw new Error("otp expiry please register again")
    }
    if (record.otp !== otp) {
      throw new Error("Invalid OTP");
    }
  
    //save user
    const user = new Model.User({
      phoneNumber,
      email: record.email,
      userName: record.userName,
      password : record.password
    });
    
    await user.save();
    if (!user._id) throw new Error("User ID not generated");

      const token = generateToken(user._id,user.role);
      console.log("Token generated:", token);
    
    return { user , token};

  } catch (error) {
    console.log("erro in creating user", error);
    throw error;
  }
};

//send otp for login
export const loginOtp = async ({ phoneNumber , password}) => {
  console.log("password",password)
  try {
    const user = await Model.User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("user not exist")
    };
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(password , user.password)
    if (!isMatch){
      throw new Error("invalid password")
    }


    const otpResponse = await service.user.sendOtp({ phoneNumber });
    console.log("otp Response", otpResponse);

    if (!otpResponse || !otpResponse.otp) {
      throw new Error("No OTP returned from sendOtp()");
    }
    const otp = otpResponse.otp;
    await Model.OTP.findOneAndUpdate(
      { phoneNumber },
      { phoneNumber,password, otp  },
      { upsert: true, new: true }
    )
    return { otp }
  } catch (error) {
    console.log("error in getting otp for login", error);
    throw error;
  }
};

//verify otp and login
export const login = async({phoneNumber,otp}) => {
  try {
    
    const user = await Model.User.findOne({phoneNumber});
    console.log("working in this ")
    if(!user){
      console.log("user not exist");
      throw new Error("user does not exist");
      
    };
    //find otp
    const record = await Model.OTP.findOne({phoneNumber});
    if(!record){
      
      console.log("otp not exist with this number");
      throw new Error("otp does not exist")
    }
    //check otp exipiry
    if(record.expiresAt<Date.now()){
      await Model.OTP.deleteOne({phoneNumber});
      throw new Error("otp expiry please login again");
  }
  if(record.otp !== otp){
    console.log("not a valid otp")
    throw new Error("not a valid otp")
  }
  await Model.OTP.deleteOne({ phoneNumber });
   const token = generateToken(user._id)
  return { success: true, message: "Login successful" ,token , user};
  
}catch(error){
  console.log("error in login user",error);
  throw error;
}
};


