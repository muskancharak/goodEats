import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import DataProvider from './context/DataProvider';
import NavBar from './components/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Login/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { RequestDetails } from './components/RequestDetails';
import SellerDashboard from './pages/Login/SellerDashboard';
import ManageMenuDialog from './pages/manageMenuDialog';
import UserDashboard from './pages/Login/userDashboard';
import RestaurantMenuPage from './pages/restuarantMenuPage';
import CartPage from './pages/AddToCart';

function App() {
  return (
    <>
     <DataProvider>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/profile" element = {<Profile />} />
        <Route path = "/adminDashboard" element = {<AdminDashboard />} />
      <Route path="/admin/request/:_id" element={<RequestDetails />} />
      <Route path = "/sellerDashboard" element={<SellerDashboard />} />
       <Route path="/restaurant/:restaurantId/menu" element={<RestaurantMenuPage />} />
       
     <Route path = "/userDashboard" element={<UserDashboard />} />
     <Route path = "/cart" element={<CartPage />} />
       
        {/* <Route path = "/menu/:restaurantId" element ={<Menu />} /> */}
        
      </Routes>
    </BrowserRouter>
   </DataProvider> 
    </>
  )
}

export default App
