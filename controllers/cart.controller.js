import { users } from "../models/user.model.js"
import { products } from "../models/product.model.js"

export const addtocart=async function(req,res){
    try{
        if(req.rootUser.cart.length>0){
            const newitem= req.rootUser.cart((element)=>{
                return element.item._id===req.body.item._id
            })
            if(newitem){
                const index=req.rootUser.cart.indexOf(newitem)
                req.rootUser.cart[index].quantity++
                req.rootUser.save()
                return res.status(200).json({message:"item successfully added"})
            }
            else{
                let item={quantity:1,item:req.body}
                req.rootUser.cart.push(item)
                req.rootUser.save()
                return res.status(200).json({message:"item successfully added"})
    
            }
    
        }
        else{
            let item={quantity:1,item:req.body}
            req.rootUser.cart.push(item)
            req.rootUser.save()
            return res.status(200).json({message:"item successfully added"})
        }
       
    }
    catch(err){
        return res.status(501).json({error:err,message:"item is not added in cart"})
    }
}
export const cartdetails=async function(req,res){
    try{
        let cartlength=req.rootUser.cart.length;
        if(cartlength){
            return   res.status(200).json({data:req.rootUser.cart,message:"cart is empty"})

        }
        else{
         return   res.status(201).json({message:"cart is empty"})
        }

    }
    catch(err){
       return res.status(501).json({error:err,message:"cart not found"})
    }
}
export const deleteitemfromcart=async function(req,res){
    try{
        
           rootUser.cart= rootUser.cart.filter((ele)=>{
            return req.body._id!==ele.item._id

            })
            rootUser.save()
           return res.status(201).json({message:"item deleted successfully"})
        




    }
    catch(err){
        return res.status(501).json({error:err,message:"item not deleted"})
     }

}
export const updatecart=async function(req,res){
    try{if(rootUser.cart.length){
        const newitem= req.rootUser.cart((element)=>{
            return element.item._id===req.body.item._id
        })
        if(newitem){
            const index=req.rootUser.cart.indexOf(newitem)
            req.rootUser.cart[index].quantity=req.body.quantity
            req.rootUser.save()
            return res.status(200).json({message:"cart successfully updated"})
        }}

    }
    catch(err){
        return res.status(501).json({error:err,message:"cart not updated"})
     }
}
export const clearcart=async function(req,res){
    try{
        req.rootUser.cart.length=0
        req.rootUser.save()
        return res.status(200).json({message:"cart successfully cleared"})

    }
    catch(err){
        return res.status(501).json({error:err,message:"cart not cleared"})
    }
}
export const cartitems=async function(req,res){
    try{
        const cartitems=req.rootUser.reduce(function(accm,ele){
            return accm+ele.quantity

        },0)
        res.status(200).json({message:"cart items successfully found",cartitems})

    }
    catch(err){
        return res.status(501).json({error:err,message:"cart items not found"})
    }
}
export const getproducts=async function(req,res){
    try {
        const producstdata = await products.find();
        console.log(producstdata + "data mila hain");
        res.status(201).json(producstdata);
    } catch (error) {
        console.log("error" + error.message);
    }
}

