import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import Productcards from '../../components/Navbar/Productcards/Productcards';
import './Home.css'

function Home() {
 
const[products, setProducts] = useState([]);
const [search, setSearch] = useState([]);

const searchProducts = async () =>{
if(search === ''){
  loadProducts();
  return;
}
const response = await axios.get(`/products/search?q=${search}`)
setProducts(response?.data?.data);
}

useEffect(() =>{

},[search])

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

<input type='text'
 placeholder='Search'
  className='search-bar' 
  onChange={(e) => {
    setSearch(e.target.value)
  }}
  />

      <div className='products-container'>
{
  products?.map((product,index)=>{
    const {_id, name, description, price, image}=product
    return(
      <Productcards key={index}
      name={name}
      description={description}
      price={price}
      image={image}
      id={_id}
      />
    )
  })
} 
</div>
      </div>
  
  )
}

export default Home