import React from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import profileIcon from "../Assests/profile-icon-design-free-vector.jpg";

export default function SingleMessage({own}) {
  return (
    <div className={own ? `${styles.singleMessage} ${styles.own}` : styles.singleMessage}>
        <div className={styles.singleMessageTop}>
            <img src={profileIcon} alt="profile image"/>
            <p className={styles.singleMessageText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, voluptas dolorem aliquid quidem eveniet totam placeat fugiat magnam veniam similique vitae ducimus asperiores itaque eum qui voluptate voluptates exercitationem dolorum.</p>
        </div>
        <div className={styles.singleMessageBottom}>
            <p>1 hour ago</p>
        </div>
    </div>
  )
}
