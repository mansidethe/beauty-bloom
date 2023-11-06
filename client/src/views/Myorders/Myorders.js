import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Myorders.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

const STATUS_BADGE_COLOR_MAP = {
    'pending': 'badge-danger',
    'shipped': 'badge-warning',
    'delivered': 'badge=success'
}

function Myorders() {


    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);


    const loadOrders = async () => {
        const storeUser = JSON.parse(localStorage.getItem("user") || '{}');
        const userId = storeUser._id;

        if (!userId) {
            return;
        }
        const response = await axios.get(`/orders/user/${userId}`)
        setOrders(response?.data?.data)
    }

    useEffect(() => {
        loadOrders();
    }, [user])

    useEffect(() => {
        const storeUser = JSON.parse(localStorage.getItem("user") || '{}');

        if (storeUser?.email) {
            setUser(storeUser);

        }
        else {
            alert('You are not logged in');
            window.location.href = '/login'
        }

    }, [])

    console.log(orders);

    return (
        <div>
            <Navbar />
            <h1>My orders</h1>

            <div className='order-container'>
                {
                    orders?.map((orders, index) => {
                        const { product, quantity, status, deliveryCharges } = orders;
                        return (
                            <div className='order-card'>
                                <Link to={`/buy/${product._id}`} className='product-name-link'>{product.name}</Link>
                                <h1>₹{product.price} x {quantity}= ₹{product.price * quantity}</h1>
                                <span className={`orders-status${STATUS_BADGE_COLOR_MAP[status]}`}>{status}...</span>
                                <span>Delivery Charges ₹{deliveryCharges}</span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Myorders