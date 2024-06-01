import jwt from "jsonwebtoken";
import { users } from "../models/user.model.js";
export const authenicate = async(req,res,next)=>{
    try {
        const token = await req.cookies.eccomerce;
        console.log(req.cookies)
        
        
        
        const verifyToken =  jwt.verify(token,process.env.SECRET);
        console.log(verifyToken)
       
     
        const rootUser = await users.findOne({_id:verifyToken._id})
        console.log(rootUser)
         
       

        if(!rootUser){ throw new Error("User Not Found") };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  


     } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};
