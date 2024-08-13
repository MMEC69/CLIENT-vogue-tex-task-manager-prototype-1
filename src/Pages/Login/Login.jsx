import React, { useContext } from 'react';
import styles from "../../Components/ComponentCSS/ComponentCSS.module.css";
import styles1 from "../../Components/ComponentCSS/Layout.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import {toast} from "react-hot-toast";
import { Field3, SubmitBtn2 } from '../../Components/UtilizeComponents/fC';
import { MidHG, BigHG } from "../../Components/UtilizeComponents/spC";
import { UserContext } from '../../Context/UserContex';
import { PasswordResetPopup } from '../../Components/UtilizeComponents/PopUps';

export default function Login() {
    const [logInfo, setLogInfo] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const {setUser, user} = useContext(UserContext);

    const [trigger1, setTrigger1] = useState(false);

    const loginUser = async (e) => {
        e.preventDefault();
        console.log("> loginUser initiated");
        const { 
            email, 
            password 
        } = logInfo;
        try {
            const {data} = await axios.post("/login", {
                email,
                password
            });
            if(data.error){
                console.log(data.error);
                console.log("> loginUser ended");
                toast.error(data.error); 
            }else{
                setLogInfo({});
                await axios.get("/user")
                .then(({data}) => {
                    setUser(data);
                    window.localStorage.setItem("loggedUser", JSON.stringify(data));
                });
                console.log("> loginUser ended");
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const passwordResetHandleOnClick = (e) => {
        console.log("> passwordResetHandleOnClick initiated");
        setTrigger1(true);
        console.log("> passwordResetHandleOnClick ended");
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

            <div onClick={passwordResetHandleOnClick}>
                <MidHG s = "Forgot Password?"/>
            </div>
            <PasswordResetPopup
                trigger = {trigger1}
                setTrigger = {setTrigger1}
            />
             
            
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
