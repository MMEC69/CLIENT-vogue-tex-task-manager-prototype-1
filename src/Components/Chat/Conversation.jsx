import React, { useEffect, useState } from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import profileIcon from "../Assests/profile-icon-design-free-vector.jpg";
import axios from 'axios';

export default function Conversation(props) {
    const {
        conversation,
        currentUser
    } = props;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const coworkerId = conversation.members?.find((m) => {
            return m !== currentUser.id
        });
        const getUser = async () => {
            console.log("> getUser initiated");
            try {
                const {data} = await axios(`/chatUsers/${coworkerId}`);
                setUser(data);
            } catch (error) {
                console.log(error);
                console.log("> getUser ended");
            }
            console.log("> getUser ended");
        }
        getUser();
    }, [currentUser, conversation]);
  return (
    <div className={styles.conversation}>
        <div className={styles.conversationImg}>
            <img 
                src={user?.profileImage ? user.profileImage : profileIcon} 
                alt="profile icon" 
            />
        </div>
        <div className={styles.conversationName}>
            <span className={styles.conversationName}>
                {user?.fullName}
            </span>
        </div>
    </div>
  )
}
