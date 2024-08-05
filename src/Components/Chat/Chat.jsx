import React, { useContext, useEffect, useState } from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import Conversation from './Conversation';
import SingleMessage from './SingleMessage';
import ChatOnline from './ChatOnline';
import { UserContext } from "../../Context/UserContex";
import axios from 'axios';

export default function Chat() {
  const {
    users,
    user
  } = useContext(UserContext);

  const [conversations, setConversation] = useState([]);

  const userId = user.id;
  
  useEffect(() => {
    const getConversations = async() => {
      console.log("> getConversations initiated");
      try {
        const {data} = await axios.get(`/getConversation/${userId}`);
        setConversation(data);
      } catch (error) {
        console.log(error);
      }
      console.log("> getConversations ended");
    }
    getConversations();
  }, [userId]);
  return (
    <div className={styles.chat}>
        <div className={styles.userList}>
            <input 
                type="text"
                placeholder='Search for users' 
            />
            {conversations?.map((conversation) => {
              return <Conversation
                        conversation = {conversation}
                        currentUser = {user}
                    />;
            })}
        </div>
        <div className={styles.messenger}>
          <div className={styles.messengerWrapper}>
            <div className={styles.messengerTop}>
              <SingleMessage own = {true}/>
              <SingleMessage/>
              <SingleMessage/>
              <SingleMessage/>
              <SingleMessage/>
              <SingleMessage/>
            </div>
            <div className={styles.messengerBottom}>
              <textarea
                className={styles.messageInput} 
                name="sendMessage" 
                id="sendMessage"
                placeholder='Type the message'
              >
              </textarea>
              <button
                className={styles.messageSendButton}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className={styles.onlineList}>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
        </div>
    </div>
  )
}
