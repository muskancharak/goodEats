import Model from "../model/index.js";
import mongoose from "mongoose";

export const createMenu = async({DishName,description,price,image,restaurantId,userId}) => {
    console.log(DishName)
    try {
        const existMenu = await Model.MenuItem.findOne({DishName});
        if(existMenu){
            console.log("menu already exist");
            throw new Error("menu already exist under this userId")
        };
        const newMenu = new Model.MenuItem({
            DishName,
            price,
            description,
            image,
            restaurantId,
            userId
        });
        
        await newMenu.save();
        return newMenu;
    }catch(error){
        console.log("error in creating menu" , error);
        throw error;
    }
};

//get all restro
export const getAllMenu = async ({restaurantId}) => {
  console.log("restaurantID",restaurantId)
  try {
    // If restaurantId is passed, filter menu by that restaurant
    const matchStage = restaurantId
      ? { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } }
      : { $match: {} };

    const menu = await Model.MenuItem.aggregate([
      matchStage,
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
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurantDetails",
        },
      },
      { $unwind: { path: "$restaurantDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          DishName:1,
          description: 1,
          price: 1,
          userId: {
            userId: "$userDetails._id",
            userName: "$userDetails.userName",
          },
          restaurantId: {
            restaurantId: "$restaurantDetails._id",
            RestroName: "$restaurantDetails.RestroName",
          },
          image: 1,
          createdAt: 1,
        },
      },
    ]);

    const totalCount = restaurantId
      ? menu.length
      : await Model.MenuItem.countDocuments({});

    // 🧩 Add full URL for each image
    const restroWithFullUrl = menu.map((r) => ({
      ...r,
      image: r.image?.startsWith("http")
        ? r.image
        : `http://localhost:2000/uploads/${r.image}`,
    }));

    return { menu: restroWithFullUrl, totalCount };
  } catch (error) {
    console.log("Error fetching menu:", error);
    throw error;
  }
};
