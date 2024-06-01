import { Router } from "express";
import { authenicate } from "../middlewares/authenticate.middleware.js";
import { cartdetails,cartitems,clearcart,deleteitemfromcart,updatecart,addtocart, getproducts } from "../controllers/cart.controller.js";
 const router=Router()
router.get("/cartdetails",authenicate,cartdetails)
router.get("/cartitems",authenicate,cartitems)
router.delete("/deleteitemfromcart",authenicate,deleteitemfromcart)
router.delete("/clearcart",authenicate,clearcart)
router.patch("/updatecart",authenicate,updatecart)
router.post("/addtocart",authenicate,addtocart)
router.get("/getproducts",getproducts)
export default router