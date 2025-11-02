import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    CategoryName : {
        type : String,
        unique : true,
        required : true,
    },

    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required:true},
    restroId : {type : mongoose.Schema.Types.ObjectId, ref : "Restaurant" , required : true },
    
    image : {
        type : String
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
},{timestamps :true});

const Category = mongoose.model('Category',categorySchema);
export default Category;