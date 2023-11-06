import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './../../components/Navbar/Navbar'
import axios from 'axios'
import './Buypage.css'


function Buypage() {
    const {id}=useParams()
const [product, setProduct] =useState({});
let [quantity, setQuantity]= useState(1);
const [shippingAddress,setShippingAddress] = useState('');
const [deliverycharges, setDeliveryCharges] = useState(0)

const loadProduct = async ()=>{
   
    const response = await axios.get(`/product/${id}`);
    setProduct(response?.data?.data);
};

useEffect(()=>{
    loadProduct();
},[]);

const increaseQuantity = () =>{
    setQuantity(++quantity)
}
const decreaseQuantity = () =>{
    if (quantity === 1)
     return
    setQuantity(--quantity)  
}
const orderPlace = async () =>{
    const userStore = JSON.parse(localStorage.getItem('user') || '{}')

    const newOrderUser= {
        user:userStore?._id,
        product:product._id,
        quantity:quantity,
        shippingAddress:shippingAddress,
        delivery_charges:deliverycharges
    }

    const response= await axios.post('/order',newOrderUser)

    alert(response?.data?.message)

    if(response?.data.success){
        window.location.href='/orders'
    }
}


  return (
    <div>
        <Navbar/>
        <div className='buy-product-container'>
       <div className='buy-product-info'>
        <div>
        <img src={product.image} className='buy-product-image'/>
        </div>
        <div className='buy-product-txt'>
            <h1>{product.price}</h1>
        <h1>{product.name}</h1>
        <h1>{product.description}</h1>
        <div>

            <button type='button'
            onClick={increaseQuantity}
             className='btn-increase-quantity'>+</button>

            <button>{quantity}</button>

            <button type='button' 
            onClick={decreaseQuantity}
            className='btn-decrease-quantity'>-</button><br/><br/>

<input type='text' 
placeholder='Enter your shipping address'
value={shippingAddress}

onChange={(e)=>{
    setShippingAddress(e.target.value)
}}
/><br/><br/>

<div>
<input type='radio' 
value={deliverycharges}
name='deliverycharges'
onClick={()=>{
    setDeliveryCharges(40)
}}
/><label>Normal delivery charges</label>

<input type='radio' 
placeholder='Enter your shipping address'
value={deliverycharges}
name='deliverycharges'
onClick={()=>{
    setDeliveryCharges(100)
}}
/><label>Super fast delivery charges</label>
</div>
        </div>
        <br/><br/>
<button type='button'
onClick={orderPlace}>
    order Now
</button>

    </div>
    </div>
    </div></div>
  )
}

export default Buypage