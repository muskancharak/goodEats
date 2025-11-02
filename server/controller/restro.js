import { SUCCESS } from "../messages/index.js";
import service from "../service/index.js";
import { errorResponse, successResponse } from "../utils/response.js";

//create category
export const createRestaurants = async(req,res) => {
    const {RestroName,location,description} = req.body;
    
    const userId = req.userId;
    const image = req.file ? req.file.filename : null;
     console.log("REQ.BODY:", req.body);   // ✅ Debug
    console.log("REQ.FILE:", req.file); 
    try {
        const restro = await service.restro.createRestro({RestroName,location,description,userId , image});
        successResponse(res,restro , SUCCESS.RESTRO_ADDED);
    }catch(error){
        errorResponse(res,error);
    }
};

//update
export const updateRestro = async(req,res) => {
    try {
        const { _id} = req.params;
        const { RestroName} = req.body;
        const updateRestro = await service.restro.update({_id , RestroName});
        successResponse(res,updateRestro,SUCCESS.RESTRO_UPDATED);
    }catch(error){
        errorResponse(res,error)
    }
};

//delete
export const deleteRestro = async(req,res) => {
    try {
        const {_id} = req.params;
        const softDeleteRestro = await service.restro.deleteRestro({_id});
        successResponse(res,softDeleteRestro,SUCCESS.CATEGORY_DELETED);
    }catch(error){
        errorResponse(res,error)
    };
};

//get
export const getRestro = async(req,res) => {
    try {
        const getRestro = await service.restro.getAllRestro();
        successResponse(res,getRestro,SUCCESS.RESTRO_FETCHED)
    }catch(error) {
        errorResponse(res,error)
    }
};