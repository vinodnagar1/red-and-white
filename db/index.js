import mongoose from "mongoose"
export const conn=async function(){
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}/r&w`)
    console.log("database connected succeesfully")
    }
    catch(err){
        console.log("database connection failed")
        console.log(err)
    }
}