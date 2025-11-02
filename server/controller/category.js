import { SUCCESS } from "../messages/index.js";
import service from "../service/index.js";
import { errorResponse, successResponse } from "../utils/response.js";

//create category
export const createCategories = async(req,res) => {
    const {CategoryName} = req.body;
    try {
        const category = await service.category.createCategory({CategoryName,userId , image});
        successResponse(res,category , SUCCESS.CATEGORY_ADDED);
    }catch(error){
        errorResponse(res,error);
    }
};

//update
export const updateCategories = async(req,res) => {
    try {
        const { _id} = req.params;
        const { CategoryName} = req.body;
        const updateCategory = await service.category.update({_id , CategoryName});
        successResponse(res,updateCategory,SUCCESS.CATEGORY_UPDATED);
    }catch(error){
        errorResponse(res,error)
    }
};

//delete
export const deleteCategories = async(req,res) => {
    try {
        const {_id} = req.params;
        const softDeleteCategory = await service.category.deleteCategory({_id});
        successResponse(res,softDeleteCategory,SUCCESS.CATEGORY_DELETED);
    }catch(error){
        errorResponse(res,error)
    };
};