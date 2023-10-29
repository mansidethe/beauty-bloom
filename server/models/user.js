import mongoose,{ Schema,model } from "mongoose";

const userSchema =  new Schema({
    name: {
       type: String,
       default:"-",
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    mobile:{
        type:Number,
        unique:true,
        required:true,
    },
    address:{
        type:String,
        
    },
    gender:{
        type:String,
        default:"Prefer not to say",
    },

},
{
    timestamps:true,
}
);
const User = mongoose.model ("User",userSchema);

export default User