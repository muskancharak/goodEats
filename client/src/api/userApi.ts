import React from "react";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

//send otp for new user
export const authenticateSendOtp = async (formValues: { userName: string; email: string; phoneNumber: string }) => {
  try {
    const response = await axios.post(`${API_URL}/user/sendOtp`,
      formValues,
      { withCredentials: true }
    );
    return response;
  } catch (error: any) {
    console.log("Error in axios", error);
    throw new Error(error.response?.data?.message || error.message || "Axios error");
  }
};

//verify and create user

export const authenticateRegisterUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log("Error in axios", error);
    throw new Error(error.response?.data?.message || "Axios error");
  }
};

// send otp for login user
export const authenticateLoginOtp = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/user/otpLogin`, data, {
      withCredentials: true,
    });
    return response.data
  } catch (error: any) {
    console.log("Error in axios", error);
    throw new Error(error.response?.data?.message || "Axios error");
  }
};

//login user
export const authenticateLogin = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, data);

    // ✅ Save token in localStorage
    const token = response.data?.data?.token;
if (token) {
  localStorage.setItem("token", token);
  console.log("✅ Token saved:", token);
}

    console.log("response",response.data)
    return response.data;
  } catch (error: any) {
    console.log("Error in axios", error);
    throw new Error(error.response?.data?.message || "Axios error");
  }
};


//admin register
export const authenticateAdminRegister = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/user/create`, data, {
      withCredentials: true,
    });
    return response.data
  } catch (error: any) {
    console.log("Error in axios", error);
    throw new Error(error.response?.data?.message || "Axios error");
  }
};

//admin
export const authenticateAdminLogin = async (data: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/loginAdmin`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // if your backend uses cookies or sessions
      }
    );

    // ✅ Save token locally if backend returns it
   const token = response.data?.data?.token;
    if (token) {
      localStorage.setItem("token", token);
      console.log("token", token)
    }
    return response.data;
  } catch (error: any) {
    console.log("Error in axios", error);
    throw new Error(error.response?.data?.message || "Axios error");
  }
};
