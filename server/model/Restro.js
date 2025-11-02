import mongoose from "mongoose";

const restroSchema = new mongoose.Schema({
    RestroName : {
        type : String,
        unique : true,
        required : true,
    },

    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required:true},
    location : {type :
        String
    },
    description:{
        type : String
    },
    
    image : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
},{timestamps :true});

const Restaurant = mongoose.model('Restaurant',restroSchema);
export default Restaurant;