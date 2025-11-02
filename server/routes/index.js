import express from "express";
import user from './user.js';
import category from './category.js';
import restro from './restro.js';
import seller from './sellerRequest.js';
import admin from './admin.js';
import menu from './menuItems.js'
const router = express.Router();

router.use('/user',user);
router.use('/category',category);
router.use('/restro',restro);
router.use('/seller',seller);
router.use('/admin',admin);
router.use('/menu',menu)

export default router;