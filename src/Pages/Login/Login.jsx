import React from 'react';
import "./Login.css";
import logo from "../../Components/Assests/logo-vogue.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {toast} from "react-hot-toast";

export default function Login() {
    const [logInfo, setLogInfo] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = logInfo;
        try {
            const {data} = await axios.post("/login", {
                email,
                password
            });
            if(data.error){
              toast.error(data.error); 
            }else{
                setLogInfo({});
                navigate("/dashboard");
            }
        } catch (error) {
            
        }
        
    }
  return (
    <div className='container'>
        <div className='logger'>
        <div className='heading'>
            <h1>Login</h1>
        </div>

        <form onSubmit={loginUser}>
            <div className='label-field'>
                <label>Email</label>
            </div>
            <div className='input-field'>
                <input 
                    type='text'
                    placeholder='Email'
                    autoComplete='off'
                    name = "email"
                    value = {logInfo.email}
                    onChange={(e) => setLogInfo({...logInfo, email: e.target.value})}
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
                    value={logInfo.password}
                    onChange={(e) => setLogInfo({...logInfo, password: e.target.value})}
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
