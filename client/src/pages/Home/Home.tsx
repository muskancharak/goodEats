import React from "react";
import Navbar from "../../components/Navbar";
import UserDashboard from "../Login/userDashboard";


const Home : React.FC = () => {
    return(
        <div>
            <Navbar />
            <UserDashboard />
            
        </div>
    )
}
export default Home;