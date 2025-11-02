import { SUCCESS } from "../messages/index.js";
import service from "../service/index.js";
import { errorResponse, successResponse } from "../utils/response.js";

//create menu
export const createMenuItems = async(req,res) => {
    const{DishName,description,price,restaurantId} = req.body
    
    const userId = req.userId;
    const image = req.file ? req.file.filename : null;
    console.log("REQ.BODY:", req.body);  
    console.log("REQ.FILE:", req.file); 
    try {
        const menuItems = await service.menu.createMenu({DishName,price,description,userId ,image,restaurantId});
        successResponse(res,menuItems , SUCCESS.MENU_ADDED);
    }catch(error){
        errorResponse(res,error);
    }
};

//get restro
export const getAllMenuItems = async(req,res) => {
    try {
        const {restaurantId} = req.params;
        const getRestro = await service.menu.getAllMenu({restaurantId});
        successResponse(res,getRestro,SUCCESS.RESTRO_FETCHED)
    }catch(error) {
        errorResponse(res,error)
    }
};