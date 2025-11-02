import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.DATABASE_URL;
console.log("MongoDB URL:", URL);

const connectDB = mongoose.connect(URL)
  .then(async() => {
    console.log("successfully connect to mongodb")
  }).catch((error) => {
    console.log("eror in connecting mongodb")
  });

export default connectDB;