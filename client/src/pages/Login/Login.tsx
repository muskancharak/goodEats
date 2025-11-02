import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Button, styled, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'

import {  authenticateAdminLogin, authenticateLogin, authenticateLoginOtp, authenticateRegisterUser, authenticateSendOtp } from "../../api/userApi";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";



const LoginButton = styled(Button)`
   margin-top: 30px;
   height : 50px;
   background-color: #ff9a3c;
`;

const CustomTextField = styled(TextField)({

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root": {
    color: "black",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "black",
  },
});
interface LoginProps {
  onClose?: () => void;
}

interface InitialValues {
  userName: string;
  email: string;
  phoneNumber: string;
  password : string
};
interface AccountType {
  userName: string;
  role: "USER" | "SELLER" | "ADMIN";
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState<'login' | 'SignUp'>('login');
   const [role, setRole] = useState<"user" | "seller" | "admin">("user");
  const [open, setOpen] = useState(false);
  const [otp , setOtp] = useState("");
  const [showOtpPage , setShowOtpPage] = useState(false);
 
  // const [account, setAccount] = useState<AccountType | null>(null);
  const { setAccount } = useContext(DataContext)!;


  const [formValues , setFormValues] = useState<InitialValues>({
        userName: "",
      email: "" ,
      phoneNumber: "",
      password : ""
    });
  

  
  const handleClose = () => {
    setOpen(false)
  };

//for new usser
  const handleSendOtp = async () => {
    try {
      const res = await authenticateSendOtp(formValues);
      console.log("otp send",res);
      setShowOtpPage(true);
    
    }catch(error){
      console.log("error in sending otp")
    }
  };

const handleVerifyOtp = async () => {
  try {
    const res = await authenticateRegisterUser({
      phoneNumber: formValues.phoneNumber,
      otp: otp, 
    });
    console.log("User registered:", res);
  } catch (error:any) {
    console.error(error.message);
  }
};

//for login
const handleLoginOtp = async() => {
  try {
    const res = await authenticateLoginOtp({
      phoneNumber: formValues.phoneNumber,
      password : formValues.password
    });
    console.log("otp send",res);
    setShowOtpPage(true);
  }catch(error){
    console.log("error in sending login otp")
  }
};


const handleLoginUser = async () => {
  try {
    const res = await authenticateLogin({
      phoneNumber: formValues.phoneNumber,
      otp: otp,
    });

    console.log("login successful", res);

    // Update context here
    setAccount({
      name: res.data.user.userName!,   // from API
      role: "USER"
    });

    onClose?.(); // close drawer
  } catch (error) {
    console.log("error in login user", error);
  }
};


const handleAdminLogin = async () => {
  try {
    const res = await authenticateAdminLogin({
      email: formValues.email,
      password: formValues.password
    });
   console.log("login successful", res);
    setAccount({
  name: res.user?.userName,      // or any name property from your user object
  role : res.data?.user?.role     // "ADMIN" or "SELLER" coming from backend
});
console.log("Login Response:", res);
console.log("User Role:", res.user?.role);
    const role = res.data?.user?.role;

if (role === "ADMIN") {
  window.location.href = "/adminDashboard";
} else if (role === "SELLER") {
  window.location.href = "/sellerDashboard";
} else {
  window.location.href = "/userDashboard";
}

    onClose?.(); // close drawer
  } catch (error) {
    console.log("error in admin login", error);
  }
};


   return (
    <Box>
      {/* ===== Role Switch (User / Seller / Admin) ===== */}
      <Box display="flex" justifyContent="center" mt={2}>
        <ToggleButtonGroup
          color="primary"
          value={role}
          exclusive
          onChange={(_, newRole) => newRole && setRole(newRole)}
        >
          <ToggleButton value="user">User</ToggleButton>
          <ToggleButton value="seller">Seller</ToggleButton>
          <ToggleButton value="admin">Admin</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* ================= USER ================= */}
      {role === "user" && (
        <>
          {showOtpPage ? (
            <Box>
              <Typography variant="h4" sx={{ mt: 5 }}>
                {activeForm === "login" ? "Login" : "Sign Up"}
              </Typography>
              <Typography variant="subtitle1">
                or{" "}
                <Typography
                  component="span"
                  sx={{ color: "#ff9a3c", cursor: "pointer" }}
                  onClick={() => {
                    setActiveForm("login");
                    setShowOtpPage(false);
                  }}
                >
                  login to your account
                </Typography>
              </Typography>

              <Box display="flex" flexDirection="column" gap={1} mt={3}>
                <CustomTextField
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={formValues.phoneNumber}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
                
                <CustomTextField
                  name="otp"
                  label="OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                />
                <LoginButton
                  variant="contained"
                  fullWidth
                  onClick={activeForm === "login" ? handleLoginUser : handleVerifyOtp}
                >
                  Verify OTP
                </LoginButton>
              </Box>
            </Box>
          ) : activeForm === "login" ? (
            <Box>
              <Typography variant="h4" sx={{ mt: 5 }}>
                Login
              </Typography>
              <Typography variant="subtitle1">
                or{" "}
                <Typography
                  component="span"
                  sx={{ color: "#ff9a3c", cursor: "pointer" }}
                  onClick={() => setActiveForm("SignUp")}
                >
                  create account
                </Typography>
              </Typography>

              <Box gap={0.5} display="flex" flexDirection="column">
                <CustomTextField
                  sx={{ mt: 5 }}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={formValues.phoneNumber}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
                <CustomTextField
                  name="password"
                  label="password"
                  variant="outlined"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
                <LoginButton variant="contained" fullWidth onClick={handleLoginOtp}>
                  Login via OTP
                </LoginButton>
                <small>
                  By clicking on Login, I accept the Terms & Conditions & Privacy Policy
                </small>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" sx={{ mt: 5 }}>
                Sign up
              </Typography>
              <Typography variant="subtitle1">
                or{" "}
                <Typography
                  component="span"
                  sx={{ color: "#ff9a3c", cursor: "pointer" }}
                  onClick={() => setActiveForm("login")}
                >
                  login to your account
                </Typography>
              </Typography>

              <Box display="flex" flexDirection="column" gap={1} mt={3}>
                <CustomTextField
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={formValues.phoneNumber}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
                <CustomTextField
                  name="userName"
                  label="Name"
                  variant="outlined"
                  value={formValues.userName}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
                <CustomTextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
                <CustomTextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Box>
              <LoginButton variant="contained" fullWidth onClick={handleSendOtp}>
                Continue
              </LoginButton>
              <small>
                By creating an account, I accept the Terms & Conditions & Privacy Policy
              </small>
            </Box>
          )}
        </>
      )}

      {/* ================= SELLER ================= */}
      {role === "seller" && (
        <Box>
          <Typography variant="h4" sx={{ mt: 5 }}>
            Seller Login
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            For store/seller access
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} mt={3}>
            <CustomTextField
              name="email"
              label="Email"
              variant="outlined"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              fullWidth
            />
            <CustomTextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              fullWidth
            />
            <LoginButton variant="contained" onClick={handleAdminLogin} fullWidth>
              Login as Seller
            </LoginButton>
          </Box>
        </Box>
      )}

      {/* ================= ADMIN ================= */}
      {role === "admin" && (
        <Box>
          <Typography variant="h4" sx={{ mt: 5 }}>
            Admin Login
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            For system administrators
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} mt={3}>
            <CustomTextField
              name="email"
              label="Email"
              variant="outlined"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              fullWidth
            />
            <CustomTextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              fullWidth
            />
            <LoginButton variant="contained" fullWidth onClick={handleAdminLogin}>
              Login as Admin
            </LoginButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Login;
