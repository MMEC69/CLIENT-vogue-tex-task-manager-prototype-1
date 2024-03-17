import React, { useState } from 'react';
import "./Register.css";
import logo from "../../Components/Assests/logo-vogue.jpg";
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();
    const [regInfo, setRegInfo] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    
    const regUser = async (e) => {
        e.preventDefault();
        const { fullName, email, password } = regInfo;
        try{
            const {data} = await axios.post("/register", {
                fullName, email, password
            });
            if(data.error){
                toast.error(data.error);
            }else{
                setRegInfo({});
                toast.success("Registration Successful!");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }   
    }

  return (
    <div className='container'>
        
        <div className='register'>
        <div className='heading'>
            <h1>Register</h1>
            
        </div>


        <form onSubmit={regUser}>
            <div className='label-field'>
                <label>Full Name</label>
            </div>
            <div className='input-field'>
                <input 
                    type='text'
                    placeholder='Full Name'
                    autoComplete='off'
                    name = "fullName"
                    value={regInfo.fullName}
                    onChange={(e) => {setRegInfo({...regInfo, fullName: e.target.value})}}
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
                    value = {regInfo.email}
                    onChange={(e) => {setRegInfo({...regInfo, email: e.target.value})}}
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
                    value = {regInfo.password}
                    onChange={(e) => {setRegInfo({...regInfo, password: e.target.value})}}
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
