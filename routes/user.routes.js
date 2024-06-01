import { Router } from "express";
import { authenicate } from "../middlewares/authenticate.middleware.js";
import { register,logout,loginUser } from "../controllers/user.controller.js";
import {upload } from "../middlewares/multer.middleware.js";
import { validuser } from "../controllers/user.controller.js";

 const router=Router()
 router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    register
    )
router.post("/login",loginUser)
router.post("/logout",authenicate,logout)
router.get("/validuser",authenicate,validuser)
export default router