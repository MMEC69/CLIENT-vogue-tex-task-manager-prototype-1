import React, { useEffect, useState } from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import profileIcon from "../Assests/profile-icon-design-free-vector.jpg";
import axios from 'axios';
import { userFilter3 } from '../../Functions/FilterFunctions';

export default function ChatOnline({onlineUsers, currentUserId, setCurrentChat}) {
  const [chatUsers, setChatUsers] = useState([]);
  const [onlineChatUsers, setOnlineChatUsers] = useState([]);
  // ================================================================
  useEffect(() => {
    const getChatUsers = async() => {
      console.log("> getChatUsers initiated");
      try {
        const {data} = await axios.get(`/users`);
        const filteredUsers = userFilter3(data, currentUserId); 
        setChatUsers(filteredUsers);
        console.log("> getChatUsers ended");
      } catch (error) {
        console.log(error);
        console.log("> getChatUsers ended");
      }
    }
    getChatUsers();
  }, [currentUserId]);
  // ================================================================
  useEffect(() => {
    const onlineUserArray= onlineUsers?.map((onlineUser) => {
      return onlineUser.userId
    });
    setOnlineChatUsers(chatUsers.filter(chatUser => onlineUserArray.includes(chatUser._id)));
  }, [chatUsers, onlineUsers]);
  // ================================================================
  const handleClick = async (onlineChatUser) => {
    console.log("> handleClick initiated");
    console.log(onlineChatUser)
    try {
      const {data} = await axios.get(`/getConversation/${currentUserId}/${onlineChatUser._id}`);
      setCurrentChat(data);
      console.log("> handleClick ended");
    } catch (error) {
      console.log(error);
      console.log("> handleClick ended");
    }
  }
  // ================================================================
  return (
    <div className={styles.chatOnline}>
        {onlineChatUsers.map((onlineChatUser) => (
        <div className={styles.chatOnlineUser} onClick={() =>handleClick(onlineChatUser)}>
            <div className={styles.chatOnlineImageContainer}>
                <img 
                    className = {styles.chatOnlineImage} 
                    src={onlineChatUser?.profilePicture ? profileIcon : profileIcon} 
                    alt="Profile Icon"
                />
                <div className={styles.chatOnlineBadge}></div>
            </div>
            <span className={styles.chatOnlineName}>{onlineChatUser.fullName}</span>
        </div>))}
    </div>
  )
}
