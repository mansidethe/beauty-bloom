import express from 'express'
import mongoose from 'mongoose'
import dotenve from 'dotenv'
dotenve.config();

import User from './models/user'

const app = express ();
app.use(express.json());

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if(conn){
        console.log(`MongoDB connected`)
    }
};

connectDB();

//POST / signup
app.post("/signup",async (req, res) => {
    const{name,email,password,mobile,address,gender}=req.body;

    const user=new user({
        name:name,
        email:email,
        password:password,
        mobile:mobile,
        address:address,
        gender:gender
    });
   try{
    const savedUser=await user.save();
    res.json({
        success:true,
        data: savedUser,
        message:"user created successfully"
    })
   }
   catch(e){
    res.json({
    success:false,
    message:e.message
})
   }
});


//post/login
app.post("/login",async (req, res) => {
    const{email,password}=req.body;
    if(!email || !password){
      return res.json({
        success:false,
        message:"please provide email and password"
       })
    }
    const user =await User.findOne({
        email:email,
        password:password
    }).select("name email mobile")

    if(user){
        return res.json({
            success:true,
            message:"login successful"
        });
    }
    else{
        return res.json({
            success:false,
            message:"invalid credentials"
        }); 
    }
});

const PORT = process.env.PORT || 8080 ;

app.listen(PORT, () =>{
    console.log(`Server running on port:${PORT}`)
    
})