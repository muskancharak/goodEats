import { SUCCESS } from "../messages/index.js";
import service from "../service/index.js";
import { errorResponse, successResponse } from "../utils/response.js";

//create category
export const sellerRequests = async(req,res) => {
    const {restaurantName , note , address , status} = req.body;
    const userId = req.userId;
    // const image = req.file ? req.file.filename : null;
    try {
        const category = await service.sellerRequest.SellerRequest({restaurantName,userId , note,address,status});
        successResponse(res,category , SUCCESS.SENT_REQUEST);
    }catch(error){
        errorResponse(res,error);
    }
};