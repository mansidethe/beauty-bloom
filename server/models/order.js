import { Schema,model } from "mongoose";

const orderSchema=new Schema({
    User:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:'pending'
    },
    shippingAddress:{
       type:String,
       required:true   
    },
    deliveryCharges:{
       type:Number,
       default:0
    }
    
},{
    timestamps:true
})
const Order = model('Order',orderSchema)

export default Order;