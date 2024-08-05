import React from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import profileIcon from "../Assests/profile-icon-design-free-vector.jpg";

export default function ChatOnline() {
  return (
    <div className={styles.chatOnline}>
        <div className={styles.chatOnlineUser}>
            <div className={styles.chatOnlineImageContainer}>
                <img 
                    className = {styles.chatOnlineImage} 
                    src={profileIcon} 
                    alt="Profile Icon"
                />
                <div className={styles.chatOnlineBadge}></div>
            </div>
            <span className={styles.chatOnlineName}>User Name</span>
        </div>
    </div>
  )
}
