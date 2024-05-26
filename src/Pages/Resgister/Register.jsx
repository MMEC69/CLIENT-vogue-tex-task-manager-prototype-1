import React, { useState } from 'react';
import styles from "../../Components/ComponentCSS/ComponentCSS.module.css";
import styles1 from "../../Components/ComponentCSS/Layout.module.css";
import { Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Field3, SubmitBtn2 } from '../../Components/UtilizeComponents/fC';
import { BigHG } from "../../Components/UtilizeComponents/spC";
import { fullNamePattern1, passwordPattern1 } from "../../MetaData/FormValidationPatterns";
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
            console.log("Error:" +error);
        }   
    }

  return (
    <div className={styles1.logLayout1}>
        <div className={styles1.logLayout1Inner}>
            <div className={styles.heading1}>
                <h1>Register</h1>
            </div>
            <form onSubmit={regUser}>
                <Field3
                    labelName = "Full Name"
                    type = "text"
                    placeholder = ""
                    autoComplete = "off"
                    name = "fullName"
                    value = {regInfo.fullName}
                    onChange = {(e) => {setRegInfo({...regInfo, fullName: e.target.value})}}
                    pattern = {fullNamePattern1}
                />
                <Field3
                    labelName = "Email"
                    type = "email"
                    placeholder = ""
                    autoComplete = "off"
                    name = "email"
                    value = {regInfo.email}
                    onChange = {(e) => {setRegInfo({...regInfo, email: e.target.value})}}
                />
                <Field3
                    labelName = "Password"
                    type = "password"
                    placeholder = ""
                    autoComplete = "off"
                    name = "password"
                    value = {regInfo.password}
                    onChange = {(e) => {setRegInfo({...regInfo, password: e.target.value})}}
                    pattern = {passwordPattern1}
                />
                <Field3
                    labelName = "Confirm Password"
                    type = "password"
                    placeholder = ""
                    autoComplete = "off"
                    name = "confirmPassword"
                    pattern = {regInfo.password}
                />
                <SubmitBtn2 
                    buttonName = "Register"
                    type = "submit"
                />

                <Link to = "/login" style={{ textDecoration: 'none' }}>
                    <BigHG
                        pn = "ALREADY HAVE AN ACCOUNT?"
                    />
                </Link>
            </form>
        </div>
    </div>
  );
}
