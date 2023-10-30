import express from 'express'
import mongoose from 'mongoose'
import dotenve from 'dotenv'
dotenve.config();

import User from './models/user.js'
import Product from './models/product.js';
import Order from './models/order.js';

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

    const user=new User({
        name:name,
        email:email,
        password:password,
        mobile:mobile,
        address:address,
        gender:gender,
    });
   try{
    const savedUser=await user.save();
    res.json({
        success:true,
        data: savedUser,
        message:"user created successfully"
    });
   }
   catch(e){
    res.json({
    success:false,
    message:e.message
});
   }
});

//post/login
app.post("/login",async (req, res) => {
    const{email,password}=req.body;
    if(!email || !password){
      return res.json({
        success:false,
        message:"please provide email and password"
       });
    }
    const user =await User.findOne({
        email:email,
        password:password,
    }).select("name email mobile")

    if(user){
        return res.json({
            success:true,
            data:user,
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

//get / products
app.get("/products",async(req,res)=>{
    const products = await Product.find();

    res.json({
        success:true,
        data:products,
        message:"product fetch successfully"
    })
})

//post/product
app.post("/product",async(req,res)=>{
    const {name,description,price,image,category,brand}=req.body;

    const product = new Product({
        name:name,
        description:description,
        price:price,
        image:image,
        category:category,
        brand:brand,
    });
    try{
        const savedProduct = await product.save();
    res.json({
        success:true,
        data:savedProduct ,
        message:"product created successfully"
    });
    }
    catch(e){
res.json({
    success:false,
    message:e.message
});
    }
});

//get / product:id
app.get("/product/:id",async(req,res)=>{
const {id} = req.params;

const product = await Product.findById({_id: id});
 res.json({
    success:true,
    data:product,
    message:"product fetched successfully"
 });
});

//put / product:id
app.put("/product/:id", async(req,res)=>{

const {id}=req.params;

const {name,description,price,image,category,brand}=req.body;

 await Product.updateOne({_id: id},{$set:{
    name:name,
    description:description,
    price:price,
    image:image,
    category:category,
    brand:brand,
}});
const updatedProduct = await Product.findById({_id: id});

res.json({
    success:true,
    data:updatedProduct,
    message:"product updated successfully"
});

});

//delete/product/:id
app.delete("/product/:id",async(req,res)=>{

    const {id} = req.params;
     await Product.deleteOne({_id:id});
     res.json({
        success:true,
        message:"product deleted successfully"
     });
});

//get /products/search?query=(search end pt)
app.get("/products/search",async(req,res)=>{

const {q} = req.query;

const products= await Product.find({name:{$regex: q, $options:"i"}});

res.json({
    success:true,
    data:products,
    message:"product fetched successfully"
});

});

// post / order (product)
app.post("/order", async (req, res) => {
    const {user, product,quantity,shippingAddress, deliveryCharges}=req.body;

    const order = new Order({
        user:user,
        product:product,
        quantity:quantity,
        shippingAddress:shippingAddress,
        deliveryCharges:deliveryCharges
    });
        
try{
    const savedOrder= await order.save();
    res.json({
        success:true,
        data:savedOrder,
        message:"order successfully"
    });
}
catch(e){
    res.json({
        success:false,
        message:e.message
    });
}  

});

//get/order/id

app.get("/order/:id", async (req, res) => {
    const { id } = req.params;
  
    const order = await Order.findOne({ _id: id }).populate("user  product");
  
    order.user.password = undefined;
  
    res.json({
      success: true,
      data: order,
      message: "find product successfuly",
    });
  });
  
  //GET/ orders
  app.get("/orders", async (req, res) => {
    const findProducts = await Order.find().populate("user product");
  
    findProducts.forEach((order) => {
      order.user.password = undefined;
    });
    res.json({
      success: true,
      data: findProducts,
      message: "fetch all productes.... !",
    });
  });

  //GET/userbyid/
  
  app.get("/orders/user/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Order.find({ _id: id }).populate("user product");
    res.json({
      success: true,
      data: user,
      message: "perticular user product",
    });
  });
  
  // PATCH /status
  
  app.patch("/order/status/:id", async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    await Order.updateOne({ _id: id }, { $set: { status: status } });
    const updatedProduct = await Order.findOne({ _id: id });
    console.log(updatedProduct);
    res.json({
      success: true,
      data: updatedProduct,
      message: "update succssefully",
    });
  });
  

const PORT = process.env.PORT || 8080 ;

app.listen(PORT, () =>{
    console.log(`Server running on port:${PORT}`)
    
})