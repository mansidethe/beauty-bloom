import React from 'react'
import './Productcards.css'

function Productcards({name, description, price, image}) {
  
  return (
    <div className='product-card'>
<img src={image} className='product-card-image'/>
<h1 className='product-card-name'>{name}</h1>
<p>{description}</p>
<h1 className='product-card-price'>₹ {price}</h1>

<button className='product-card-btn btn'>Buy Now</button>

    </div>
  )
}

export default Productcards