import React, { useContext, useState } from 'react';
import sampleImage from "../Assests/profile-icon-design-free-vector.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContex';
import styles from "../ComponentCSS/Layout.module.css";

export default function Profile() {
    const [updatedInfo, setUpdatedInfo] = useState({});
    const {
        user
    } = useContext(UserContext);
    
    const userId = user.id;
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("> handleSubmit initiated");
        const {
            fullName,
            email
        } = updatedInfo;
        try {
            const {data} = await axios.post("/modify/user", {
                userId: userId,
                fullName: fullName,
                email: email
            });
            localStorage.removeItem("loggedUser");
            navigate("/login");
            console.log("> handleSubmit ended");
        } catch (error) {
            console.log(error);
            console.log("> handleSubmit ended");
        }
    }
  return (
    <div className={styles.profile}>
        <div className={styles.profileImage}>
            <img 
                src={sampleImage} 
                alt="sample image" 
            />
        </div>
        <form 
            onSubmit={(e) => handleSubmit(e)}
            className={styles.userUpdateForm}
        >
            <div className={styles.profileLabel}>
                <label >Full name </label>
                <input 
                    type="text" 
                    placeholder={user.fullName}
                    value = {updatedInfo.fullName}
                    onChange={(e) => setUpdatedInfo({...updatedInfo, fullName: e.target.value})}
                />
            </div>
            <div className={styles.profileLabel}>
                <label >Email </label>
                <input 
                    type="email"
                    placeholder= {user.email}
                    value= {updatedInfo.email} 
                    onChange={(e) => setUpdatedInfo({...updatedInfo, email: e.target.value})}
                />
            </div>
            <button 
                className={styles.profileUpdateButton}
                type="submit"
            >Save changes</button>
        </form>
    </div>
  )
}
