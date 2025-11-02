import express from "express";
const router = express.Router();
import Controller from "../controller/index.js";
import { verifyToken } from "../Middleware/auth.js";


//send req
router.get('/getRequest',verifyToken("ADMIN"),Controller.getAllRequest);

//get by id
router.get('/getById/:_id',verifyToken("ADMIN"),Controller.getRequestById);

//approved req
router.put('/status/:_id',verifyToken("ADMIN"),Controller.approvedUserRequest)

export default router;