
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import Model from "../model/index.js";


const SECRET = process.env.SECRET;

//generate token
export const generateToken = (id, role) => {
    return jwt.sign({ id, role }, SECRET, { expiresIn: "1h" })
};

//verifyToken
export const verifyToken = (...allowedRoles) => async (req, res, next) => {
    const authHeader = req.header("Authorization")

    if (!authHeader) {
        return errorResponse(res, new Error("Header Missing"))
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        return errorResponse(res, new Error("Toekn missing"))
    }
    try {
        const decoded = jwt.verify(token, SECRET);

        //verify user
        const user = await Model.User.findById(decoded.id);
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        //attach to req
        req.user = user
        req.userId = user._id;  
        req.role = user.role

        console.log("Decoded Token:", decoded);
        console.log("User Role:", user.role);

        const userRole = req.user.role;

         // Role check only if roles are specified
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            return res.status(403).json({ error: "You are not authorized" });
        }
       
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    };
};

