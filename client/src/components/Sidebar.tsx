import { Box, Typography } from "@mui/material";
import React from "react";


interface SideBarProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar: React.FC<SideBarProps> = ({ selected, setSelected }) => {
  const menuItems = ["Orders", "Payment", "History", "Apply for Seller"];

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#ffecd1",
        p: 3,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo / Greeting */}
      <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
        Hello, User!
      </Typography>

      {/* Menu */}
      {menuItems.map((item) => (
        <Typography
          key={item}
          sx={{
            mb: 1,
            p: 1,
            borderRadius: 2,
            cursor: "pointer",
            bgcolor: selected === item ? "#ff9a3c" : "transparent",
            color: selected === item ? "white" : "black",
            "&:hover": {
              bgcolor: selected === item ? "#ff9a3c" : "#ffe5b2",
            },
          }}
          onClick={() => setSelected(item)}
        >
          {item}
        </Typography>
      ))}

      {/* Logout */}
      <Typography
        sx={{
          mt: "auto",
          p: 1,
          borderRadius: 2,
          cursor: "pointer",
          bgcolor: "#f28c00",
          color: "white",
          "&:hover": { bgcolor: "#ff9a3c" },
        }}
      >
        Logout
      </Typography>
    </Box>
  );
};

export default SideBar;