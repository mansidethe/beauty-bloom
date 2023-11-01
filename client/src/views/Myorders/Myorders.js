import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Myorders.css'

function Myorders() {

    const [user, setUser] = useState({});

    useEffect(()=>{
        const storgeUser = JSON.parse(localStorage.getItem("user") || '{}');

        if(storgeUser?.email){
            setUser(storgeUser);
        }
        else{
            alert('You are not logged in');
            window.location.href='/login'
        }
       
       
    },[])

  return (
    <div>
        <Navbar/>
        <h1>My orders</h1>
    </div>
  )
}

export default Myorders