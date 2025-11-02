import { SUCCESS } from "../messages/index.js";
import service from "../service/index.js";
import { successResponse,errorResponse } from "../utils/response.js";

//get all req
export const getAllRequest = async(req,res) => {
    try {
        const {paramsUserId, viewType, status }  = req.params;
        const userId = req.userId;
         const userRole = req.role;

        const getRequest = await service.admin.getAllStatus({paramsUserId,viewType , status , userId , userRole});
        successResponse(res , getRequest ,SUCCESS.FECHED_REQUEST);
    }catch(error){
        errorResponse(res,error)
    }
};

//get by id req
export const getRequestById = async(req,res) => {
    try {
        const {_id} = req.params;
         const userRole = req.role;
         const userId = req.userId;

        const getRequest = await service.admin.getByIdStatus({_id,userRole,userId});
        successResponse(res , getRequest ,SUCCESS.FECHED_REQUEST);
    }catch(error){
        errorResponse(res,error)
    }
};

//sttaus change
export const approvedUserRequest = async (req, res) => {
    try {
        const {_id} = req.params;
        const {status,reason} =req.body;
        
        const userStatus = await service.admin.userRequest(_id, status,reason)
        console.log("sttaus", userStatus);
        successResponse(res, userStatus, SUCCESS.STATUS_CHANGED);
    } catch (error) {
        console.log("error", error);
        errorResponse(res,error)
    }
};