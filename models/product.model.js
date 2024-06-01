import mongoose from "mongoose"
const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    rating:Number,
    price:Number,
    stock:Number,
    size:String,


})
export const products=mongoose.model("products",productSchema)
/*{"title":"titan glass",
    "description":"Full Rim Rectangle Anti Glare & Blue Cut Frame For Men & Women  (135 mm)",
    "rating":4.0,
    "price":350,
    "image":"https://res.cloudinary.com/dhjhwoxny/image/upload/v1716984290/sun10_sskmp8.png",
    "stock":50,
    "size":"small",
    "_id":"665937039c00f45a558ed09d"

    }*/
