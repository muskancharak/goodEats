import Model from "../model/index.js"
import Restaurant from "../model/Restro.js";



//create category
export const createRestro = async({RestroName,location ,description, userId,image}) => {
    console.log(RestroName)
    try {
        const existRestro = await Model.Restaurant.findOne({RestroName});
        if(existRestro){
            console.log("Restaurant already exist");
            throw new Error("Restaurant already exist under this userId")
        };
        const newRestro = new Model.Restaurant({
            RestroName,
            userId,
            location,
            description,
            image 
        });
        
        await newRestro.save();
        return newRestro;
    }catch(error){
        console.log("error in creating restro" , error);
        throw error;
    }
};

//update category
export const update = async({_id,RestroName}) => {
   try {
    const restro = await Model.Restaurant.findById({_id});
    if(!restro){
        console.log("restro does not exist");
        throw error;
    }
    //check duplicate
    const duplicate = await Model.Restaurant.findOne({
        RestroName , 
        _id : { $ne : _id}
    });
    if (duplicate) throw new Error("restro name already exists");
    
    //update category
    restro.RestroName = RestroName;
    const updatedRestro = await Restaurant.save();
     console.log(updatedRestro);
    return updatedRestro;
   }catch(error){
    console.log("error in updating" , error);
    throw error;
   }
};

//delete
export const deleteRestro = async(_id) => {
    try {
        const softDeleteRestro = await Model.Restaurant.findByIdAndUpdate(
            _id,
            { isDeleted : true },
            { new : true }
        );
        console.log(softDeleteRestro);
        return { softDeleteRestro}
    }catch(error){
        console.log("error in soft delete");
        throw error;
    };
};

//get all
export const getAllRestro = async () => {
  try {
    const restro = await Model.Restaurant.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          RestroName: 1,
          userId: {
            userId: "$userDetails._id",
            userName: "$userDetails.userName",
          },
          image: 1,
          createdAt: 1,
        },
      },
    ]);

    const totalCount = await Model.Restaurant.countDocuments({});

    // 🧩 Add full URL for each image
    const restroWithFullUrl = restro.map((r) => ({
      ...r,
      image: r.image
        ? `http://localhost:2000/uploads/${encodeURIComponent(r.image)}`
        : null,
    }));

    return { restro: restroWithFullUrl, totalCount };
  } catch (error) {
    console.log("error in getting api:", error);
    throw error;
  }
};


