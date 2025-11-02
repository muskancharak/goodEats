import express from "express";
const router = express.Router();
import Controller from "../controller/index.js";
import { verifyToken } from "../Middleware/auth.js";
import { upload } from "../utils/multer.js";

//send req
router.post('/send',verifyToken("USER"),Controller.sellerRequests);

export default router;