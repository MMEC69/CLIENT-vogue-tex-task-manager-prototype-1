import React, { useState } from 'react';
import "./Register.css";
import logo from "../../Components/Assests/logo-vogue.jpg";
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const PORT = 3002;
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:${PORT}/register`, {fullName, email, password:password})
        .then(result => {
            console.log(result);
            navigate("/login");
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='container'>
        <div className='register'>
        <div className='heading'>
            <h1>Register</h1>
        </div>


        <form onSubmit={handleSubmit}>
            <div className='label-field'>
                <label>Full Name</label>
            </div>
            <div className='input-field'>
                <input 
                    type='text'
                    placeholder='Full Name'
                    autoComplete='off'
                    name = "fullName"
                    onChange={(e) => {setFullName(e.target.value)}}
                />
            </div>

            <div className='label-field'>
                <label>Email</label>
            </div>
            <div className='input-field'>
                <input 
                    type='text'
                    placeholder='Email'
                    autoComplete='off'
                    name = "email"
                    onChange={(e) => {setEmail(e.target.value)}}
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
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </div>

            <div className='label-field'>
                <label>Confirm Password</label>
            </div>
            <div className='input-field'>
                <input 
                    type='password'
                    placeholder='Confirm Password'
                    autoComplete='off'
                    name = "confirm-password"
                />
            </div>

            <div className='btn'>
                <div className='submit-btn'>
                    <button type = "submit">
                        Register
                    </button>
                </div>
                
                {/* <div className='info-text'>
                    <p>Already Have an Account</p>
                </div> */}
                <div className='submit-btn'>
                    <Link to = "/login">
                        <button>
                            Login
                        </button>
                    </Link>
                </div>
            </div>

            {/* <div className='info-text'>
                <p>Forgot password</p>
            </div> */}

        </form>
    </div>
        <div className='logo'>
            <img src={logo}/>
        </div>
    </div>
    
  )
}
