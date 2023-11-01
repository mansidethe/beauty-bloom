import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import Productcards from '../../components/Navbar/Productcards/Productcards';
import './Home.css'

function Home() {
 
const[products, setProducts] = useState([]);

const loadProducts = async ()=>{
  try{
const response= await axios.get('/products');
setProducts(response?.data?.data);
  }
  catch(e){
   console.log(e)
    alert('Error loading products');
  }
};

useEffect(()=>{
  loadProducts();
},[])

  return (
 
    <div>
      <Navbar/>
      <div className='products-container'>
{
  products?.map((product,index)=>{
    const {name, description, price, image}=product
    return(
      <Productcards key={index}
      name={name}
      description={description}
      price={price}
      image={image}
      />
    )
  })
} 
</div>
      </div>
  
  )
}

export default Home