import React from 'react';
import styles from "../../Components/ComponentCSS/ComponentCSS.module.css";
import styles1 from "../../Components/ComponentCSS/Layout.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {toast} from "react-hot-toast";
import { Field3, SubmitBtn2 } from '../../Components/UtilizeComponents/fC';
import { MidHG, BigHG } from "../../Components/UtilizeComponents/spC";

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
    <div className={styles1.logLayout1}>
        <div className={styles1.logLayout1Inner}>
        <div className={styles.heading1}>
            <h1>Login</h1>
        </div>

        
        <form onSubmit={loginUser}>
            <Field3
                labelName = "Email"
                type = "email"
                placeholder = ""
                autoComplete = "off"
                name = "email"
                value = {logInfo.email}
                onChange = {(e) => setLogInfo({...logInfo, email: e.target.value})}
            />

            <Field3
                labelName = "Password"
                type = "password"
                placeholder = ""
                autoComplete = "off"
                name = "password"
                value = {logInfo.password}
                onChange = {(e) => setLogInfo({...logInfo, password: e.target.value})}
            />
            
            <SubmitBtn2 
                buttonName = "Login"
                type = "submit"
            />

            <MidHG s = "Forgot Password?"/> 
            
            <Link to = "/register" style={{ textDecoration: 'none' }}>
                <BigHG
                    pn = "SIGN UP"
                />
            </Link>
        </form>
    </div>
        
    </div>
    
  )
}
