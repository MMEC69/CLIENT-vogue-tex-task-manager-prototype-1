import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "../ComponentCSS/Layout.module.css";
import Conversation from './Conversation';
import SingleMessage from './SingleMessage';
import ChatOnline from './ChatOnline';
import { UserContext } from "../../Context/UserContex";
import axios from 'axios';
import { socketServerURL } from '../../MetaData/MetaData';
import {io} from "socket.io-client";

export default function Chat() {
  const {
    users,
    user
  } = useContext(UserContext);
  const userId = user.id;
  const [conversations, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();
  // ============================================
  useEffect(() => {
    socket.current = io(socketServerURL)

    socket.current.on("getMessage", data => {
      const createdAt = Date.now()
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: createdAt
      });
    });
  }, []);
  // ============================================
  useEffect(() => {
    arrivalMessage&&
    currentChat?.members.includes(arrivalMessage?.sender) &&
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  // ============================================
  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    })
  },[]);
  // ============================================
  const handleSubmit = async(e) => {
    console.log("> handleSubmit initiated");
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat?._id
    };

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: currentChat.members?.find(member => member !== userId),
      text: message.text
    });

    try {
      const {data} = await axios.post("/postMessage", message);
      setMessages([...messages, data])
      console.log(data);
      console.log("> handleSubmit ended");
    } catch (error) {
      console.log(error);
      console.log("> handleSubmit ended");
    }
  }
  // ============================================
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
  // ============================================
  useEffect(() => {
    const getMessage  = async() => {
      console.log("> getMessage initiated");
      try {
        const {data} = await axios.get(`/getMessage/${currentChat?._id}`);
        setMessages(data);
        console.log("> getMessage ended");
      } catch (error) {
        console.log(error);
        console.log("> getMessage ended");
      } 
    }
    getMessage();
  }, [currentChat]);
  // ============================================
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);
  // ============================================
  return (
    <div className={styles.chat}>
        <div className={styles.userList}>
            <input 
                type="text"
                placeholder='Search for users' 
            />
            {conversations?.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation
                    conversation = {conversation}
                    currentUser = {user}
                />
              </div>
            ))}
        </div>
        <div className={styles.messenger}>
          <div className={styles.messengerWrapper}>
            {currentChat ? 
            <><div className={styles.messengerTop}>
              {
                messages?.map((message) => (
                  <div ref={scrollRef}>
                  <SingleMessage 
                    message = {message}
                    own = {message.sender === userId}
                  />
                  </div>
                ))
              }
            </div>
            <div className={styles.messengerBottom}>
              <textarea
                className={styles.messageInput} 
                name="sendMessage" 
                id="sendMessage"
                placeholder='Type the message'
                value={newMessage}
                onChange={(e) => {setNewMessage(e.target.value)}}
              >
              </textarea>
              <button
                className={styles.messageSendButton}
                onClick={handleSubmit}
              >
                Send
              </button>
            </div></> : <span className={styles.noConversationText}>Open a conversation to start a chat</span>
            }
          </div>
        </div>
        <div className={styles.onlineList}>
            <ChatOnline 
              onlineUsers = {onlineUsers}
              currentUserId = {userId} 
              setCurrentChat = {setCurrentChat}
            />
        </div>
    </div>
  )
}
