import express from "express" ;
import Model from '../model/index.js';


export const SellerRequest = async (data) => {
    const { userId, restaurantName, address, note, _id } = data;

    try {
        const user = await Model.User.findById(userId); 
        if (!user) {
            console.log("You are not authorized to send request");
            throw new Error("You are not authorized to send request");
        }

        const existing = await Model.SellerRequest.findOne({ userId, status: "PENDING" });
        if (existing) {
            throw new Error("You already have a pending request");
        }

        // If no existing request, create new
        const newRequest = await Model.SellerRequest.create({
            userId,
            restaurantName,
            address,
            note,
            status: "PENDING"
        });

        return newRequest;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default SellerRequest;
