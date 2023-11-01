import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPssword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('female');

    const signup = async () => {
        if (!name) {
            alert('Name is required');
            return;
        }

        if (!email) {
            alert('Eamil is required');
            return;
        }

        if (!password) {
            alert('Password is required');
            return;
        }

        if (!mobile) {
            alert('Mobile is required');
            return;
        }

        if (!address) {
            alert('Address is required');
            return;
        }

        const response = await axios.post("/signup", {
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            address: address,
            gender: gender
        })

        alert(response?.data?.message);

        if (response?.data?.success) {
            window.location.href = '/login';
        }
    };

    return (
        <div>
            <Navbar />
            <form className="signup-form">
                <h1 className="text-center">Signup</h1>

                <div>
                    <label htmlFor='name'>Name :</label>
                    <input type='text'
                        className='form-control'
                        id='name'
                        placeholder='Enter your name'
                        value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </div>

                <div>
                    <label htmlFor='email'>Email :</label>
                    <input type='text'
                        className='form-control'
                        id='email'
                        placeholder='Enter your email'
                        value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>

                <div>
                    <label htmlFor='password'>Password :</label>
                    <input type='password'
                        className='form-control'
                        id='password'
                        placeholder='Enter your password'
                        value={password} onChange={(e) => {
                            setPssword(e.target.value);
                        }} />
                </div>

                <div>
                    <label htmlFor='mobile'>Mobile :</label>
                    <input type='text'
                        className='form-control'
                        id='mobile'
                        placeholder='Enter your mobile number'
                        value={mobile} onChange={(e) => {
                            setMobile(e.target.value);
                        }} />
                </div>

                <div>
                    <label htmlFor='address'>Address :</label>
                    <input type='text'
                        className='form-control'
                        id='address'
                        placeholder='Enter your address'
                        value={address} onChange={(e) => {
                            setAddress(e.target.value);
                        }} />
                </div>

                <div>
                    <input type='radio'
                        id='male'
                        name='gender'
                        className='gender'
                        checked={gender === 'male'}
                        onClick={() => {
                            setGender('male')
                        }} />
                    <label htmlFor='male'>Male</label>

                    <input type='radio'
                        id='female'
                        name='gender'
                        className='gender'
                        checked={gender === 'female'}
                        onClick={() => {
                            setGender('female')
                        }} />
                    <label htmlFor='female'>Female</label>
                </div>

                <button type='button'
                    className='btn signup-btn'
                    onClick={signup}
                >
                    Signup
                </button>

                <p className="text-right">
                    <Link to="/login">Already have an account</Link>
                </p>

            </form>
        </div>
    )
}


export default Signup