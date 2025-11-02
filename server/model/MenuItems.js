import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    DishName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference the user who added the item
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
