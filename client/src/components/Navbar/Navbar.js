import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [user, setUser] = useState({});

    useEffect(()=>{
        const storgeUser = JSON.parse(localStorage.getItem("user") || '{}');
        setUser(storgeUser);
    },[])
  return (

    <div className='navbar'>
        <Link to ='/' className='navbar-brand'>Beauty Bloom</Link>

        <div>
        <Link to ='/login' className='navbar-link'>Login</Link>

        <Link to ='/signup' className='navbar-link'>Signup</Link>

        <Link to ='/orders' className='navbar-link'>My orders</Link>
        </div>

        <div>
  Hello, {user.name|| 'User!'}
  {
    user.name?(
        <span className='navbar-logout' onClick={()=>{
            localStorage.removeItem('user');
            window.location.href='/login';

        }}>Logout</span>
    )
    :null
  }
</div>
 </div>



  )
}

export default Navbar