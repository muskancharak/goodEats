import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar'
import { Toolbar, Typography, styled, Button, Box, Dialog, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Login from '../pages/Login/Login';
import { DataContext } from '../context/DataProvider';


//styled component
const LoginButton = styled(Button)`
     position: absolute;
      right: 100px;
      width: 100px;
      height: 40px;
      border: 3px solid green;
      color:white
`;


const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { account, setAccount } = useContext(DataContext)!;
    const handleOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false)
    };
    const handleLogout = () => {
    setAccount(null); // clear account
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

    return (
    <AppBar
      style={{ background: "linear-gradient(135deg, #9b2de2, #ff4ec7, #ff9a3c)" }}
    >
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Hello</Typography>

        {/* Conditional Rendering */}
        {!account ? (
          <LoginButton variant="outlined" onClick={handleOpen}>
            Login
          </LoginButton>
        ) : (
          <>
            <Button sx={{ color: "white", marginRight: 2 }} onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button sx={{ color: "white" }} onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>

      {/* Drawer for Login Form */}
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 350, padding: 3 }}>
          <Login onClose={handleClose} />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
