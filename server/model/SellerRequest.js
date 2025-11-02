import mongoose from "mongoose";
import { CONSTANTS } from "../utils/constants.js";

const sellerRequestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  restaurantName: { type: String },
  address: { type: String },
  note: { type: String },
  status:{
          type : String,
          enum : Object.values(CONSTANTS.STATUS),
          default : CONSTANTS.STATUS.PENDING
      },
      role:{
        type : String,
        enum : Object.values(CONSTANTS.ROLE),
        default : CONSTANTS.ROLE.USER
    },
}, { timestamps: true });

const SellerRequest = mongoose.model("SellerRequest", sellerRequestSchema);
export default SellerRequest;
