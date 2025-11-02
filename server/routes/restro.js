import express from "express";
const router = express.Router();
import Controller from '../controller/index.js';
import { verifyToken } from "../Middleware/auth.js";
import { upload } from "../utils/multer.js";

// create restro
router.post('/create',verifyToken("SELLER"),upload.single("image"),Controller.createRestaurants);

//update
router.put('/update/:_id',verifyToken("USER"),Controller.updateRestro);

//delete
router.delete('/delete/:_id',verifyToken("USER"),Controller.deleteRestro);

//get
router.get('/get',Controller.getRestro)


export default router;
