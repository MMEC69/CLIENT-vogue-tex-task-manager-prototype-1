import React from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import profileIcon from "../Assests/profile-icon-design-free-vector.jpg";
import {format} from "timeago.js";

export default function SingleMessage({message, own}) {
  const messageText = message.text;
  const messageReceivedTime = format(message.createdAt);
  return (
    <div className={own ? `${styles.singleMessage} ${styles.own}` : styles.singleMessage}>
        <div className={styles.singleMessageTop}>
            <img src={profileIcon} alt="profile image"/>
            <p className={styles.singleMessageText}>
              {messageText}
            </p>
        </div>
        <div className={styles.singleMessageBottom}>
            <p>{messageReceivedTime}</p>
        </div>
    </div>
  )
}
