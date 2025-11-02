import express from "express";
const router = express.Router();
import Controller from "../controller/index.js";
import { verifyToken } from "../Middleware/auth.js";
import { upload } from "../utils/multer.js";

//create category
router.post('/create',verifyToken("USER") , upload.single("image"),Controller.createCategories);

//update Category
router.put('/update/:_id',verifyToken("USER"),Controller.updateCategories);

//delete
router.delete('/delete/:_id',verifyToken("USER"),Controller.deleteCategories)


export default router;