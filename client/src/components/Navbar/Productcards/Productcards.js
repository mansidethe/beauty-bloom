import React from 'react'
import './Productcards.css'
import {Link} from 'react-router-dom'

function Productcards({id, name, description, price, image}) {
  
  return (
    <div className='product-card'>
      
<img src={image} className='product-card-image'/>
<h1 className='product-card-name'>{name}</h1>
<p>{description}</p>
<h1 className='product-card-price'>₹ {price}</h1>

<Link to={`/buy/${id}`}className='product-card-btn btn'>Buy Now</Link>

    </div>
  )
}

export default Productcards