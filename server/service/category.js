import Model from "../model/index.js"

//create category
export const createCategory = async({CategoryName , userId,image}) => {
    try {
        const existCategory = await Model.Category.findOne({CategoryName});
        if(existCategory){
            console.log("category already exist");
            throw new Error("Category already exist under this userId")
        };
        const newCategory = new Model.Category({
            CategoryName,
            userId,
            image 
        });
        
        await newCategory.save();
        return newCategory;
    }catch(error){
        console.log("error in creating category" , error);
        throw error;
    }
};

//update category
export const update = async({_id,CategoryName}) => {
   try {
    const category = await Model.Category.findById({_id});
    if(!category){
        console.log("category does not exist");
        throw error;
    }
    //check duplicate
    const duplicate = await Model.Category.findOne({
        CategoryName , 
        _id : { $ne : _id}
    });
    if (duplicate) throw new Error("Category name already exists");
    
    //update category
    category.CategoryName = CategoryName;
    const updatedCategory = await category.save();
     console.log(updatedCategory);
    return updatedCategory;
   }catch(error){
    console.log("error in updating" , error);
    throw error;
   }
};

//delete
export const deleteCategory = async(_id) => {
    try {
        const softDeleteCategory = await Model.Category.findByIdAndUpdate(
            _id,
            { isDeleted : true },
            { new : true }
        );
        console.log(softDeleteCategory);
        return { softDeleteCategory}
    }catch(error){
        console.log("error in soft delete");
        throw error;
    };
};

//get all
export const getAllCategories = async() => {
    try {
        const category = await Model.Category.aggregate([
            {
                $lookup : {
                  from : "users",
                  localField : "userId",
                  foreignField : "_id",
                  as : "userDetails",
                }
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
            {
                $project : {
                    _id : 1,
                    CategoryName : 1,
                    userId : {
                        userId : "$userDetails._id",
                        userName : "$userDetails.userName"
                    },
                    createdAt :1,
                },
                
            }
        ]);
        console.log("category");
        const totalCount = await Model.Category.countDocuments({});
        return (category , totalCount)
    }catch(error){
        console.log("error in getting api");
        throw error;
    }
};

