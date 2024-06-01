import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const Helpschema=new mongoose.Schema({
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    quantity:Number
})

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true
            
            
            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            
        },
        phone: {
            type: Number,
            required: true,
            
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        education:[],
        gender:String,

        
        orderHistory: [
            {
                type:Helpschema
            }
        ],
        cart:[Helpschema],
        password: {
            type: String,
            required: true
        },
        tokens: 
            [{token:{
                type:String
            }}],
            
        

    },
    
    {
        timestamps: true
    }
)
userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        
    }
    next()
});
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET, {
            expiresIn: process.env.EXPIRY
        });

        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.status(422).json(error)
    }
}
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
/*userSchema.methods.addcartdata = async function(cart){

    try {
        this.carts.push(cart)
        await this.save()
        return this.carts;
    } catch (error) {
        console.log(error + "add to cart error");
    }
}*/
export const users =  mongoose.model("users", userSchema);
