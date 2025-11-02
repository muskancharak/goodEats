import express from "express";
const router = express.Router();
import Controller from "../controller/index.js";
import { verifyToken } from "../Middleware/auth.js";
import { upload } from "../utils/multer.js";

//create
router.post('/create',upload.single('image'),verifyToken("SELLER"),Controller.createMenuItems);

//get
router.get('/get/:restaurantId',verifyToken(),Controller.getAllMenuItems) ;

export default router;