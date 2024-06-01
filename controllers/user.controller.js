import { users } from "../models/user.model.js";
import { authenicate } from "../middlewares/authenticate.middleware.js";
import { uploadOnCloudinary } from "../utills/cloudinary.js";

export const register=async function(req,res){
    console.log("api hit")
    console.log(req.body)
    const {email, username, password,phone,education,gender } = req.body
    if (
        [email, username, password,phone].some((field) => field?.trim() === "")
    ) {
        return res.status(401).json({error:"all fields are required"})
        
    }
    const existedUser = await users.findOne({
        $or:[{email},{username}]
        
    })
    if(existedUser){
       return res.status(402).json({error:"user already exist"})
    
    }
    //console.log(req.files)
   const avatarLocalPath = req?.files?.avatar[0]?.path
    console.log(avatarLocalPath)
    if (!avatarLocalPath) {
     return   res.status(403).json({error:"image is required"})
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar){
       return res.status(404).json({error:"image is required"})

    }
    const user = await users.create({
        
       // avatar: avatar.url,
        
        email, 
        password,
        username,
        phone
    })
    const createdUser = await users.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
       return res.status(501).json({error:"user is not registered on server"})
        
    }

    return res.status(201).json(
        {message: "User registered Successfully"})
    
}
export const loginUser = async function (req, res) {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { username, password} = req.body
    console.log(username);

    if (!username) {
        return res.status(401).json({error:"username or email is required"} )
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await users.findOne({
        $or: [{username}, {email:username}]
    })

    if (!user) {
        return res.status(402).json({error:"user does not exist"} )
        
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    return res.status(403).json({error:"password is incorrect"} )
    
    }

   const token= await user.generateAuthtoken();
   
    //const token= await user.generatAuthtoken()
    res.cookie("eccomerce", token, {
     expires: new Date(Date.now() + 2589000),
     httpOnly: true
 });
   /*res.cookie("eccomerce", token, {
    expires: new Date(Date.now() + 2589000),
    httpOnly: true,
    secure:true
});*/
return res.status(200).json({message:"user loged in successfully"})


   
}
export const logout=async function(req,res){
    try {
        req.rootUser.tokens =await req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("eccomerce", { path: "/" });
       // req.rootUser.islogedin=false;
        req.rootUser.save();
        console.log("user logout ho gya..."+req.rootUser);
       return res.status(201).json({message:"logout successfull"});
       

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
}
export const validuser=async function(req,res){
    try {
        const validuserone = await users.findOne({ _id: req.userID }).populate({path:"cart",populate:{path:"item"}}).select("-password -tokens -email -phone");
        
        
        console.log(validuserone + "user log in ho gya...");
        

        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
}
