import React from 'react';
import "./Login.css";
import logo from "../../Components/Assests/logo-vogue.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const PORT = 3002;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:${PORT}/login`, {email, password:password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                navigate("/dashboard");
            }
            
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='container'>
        <div className='logger'>
        <div className='heading'>
            <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div className='label-field'>
                <label>Email</label>
            </div>
            <div className='input-field'>
                <input 
                    type='text'
                    placeholder='Email'
                    autoComplete='off'
                    name = "email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='label-field'>
                <label>Password</label>
            </div>
            <div className='input-field'>
                <input 
                    type='password'
                    placeholder='Password'
                    autoComplete='off'
                    name = "password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            

            <div className='btn'>
                <div className='submit-btn'>
                    <button type = "submit">
                        Login
                    </button>
                </div>
                
                {/* <div className='info-text'>
                    <p>Already Have an Account</p>
                </div> */}
                <div className='submit-btn'>
                    <Link to = "/register">
                        <button>
                            Register
                        </button>
                    </Link>
                    
                </div>
            </div>

            <div className='info-text'>
                <p>Forgot password</p>
            </div>

        </form>
    </div>
        <div className='logo'>
            <img src={logo}/>
        </div>
    </div>
    
  )
}
