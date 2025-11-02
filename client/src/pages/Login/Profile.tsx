import React, { useState } from "react";
import SideBar from "../../components/Sidebar";
import { Box } from "@mui/material";
// import Orders from "./Orders";
// import Payment from "./Payment";
// import History from "./History";
import SellerRequestForm from "../../components/SellerRequest";

interface SideBarProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Profile: React.FC = () => {
  // state to track which sidebar item is active
  const [selected, setSelected] = useState("Orders");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SideBar selected={selected} setSelected={setSelected} />

      {/* Main content area */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* {selected === "Orders" && <Orders />}
        {selected === "Payment" && <Payment />}
        {selected === "History" && <History />} */}
        {selected === "Apply for Seller" && <SellerRequestForm />}
      </Box>
    </Box>
  );
};

export default Profile;
