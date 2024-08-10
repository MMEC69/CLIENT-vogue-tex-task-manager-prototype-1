import React from 'react';
import styles from "../ComponentCSS/Popup.module.css";
import { CloseBtn1 } from '../UtilizeComponents/PopUpsU';
import axios from 'axios';

export function NewConversationPopup(props) {
    const {
        trigger,
        setTrigger,
        filteredUsers,
        userId,
        getConversations,
        setCurrentChat
    } = props;

  return (trigger) ? (
    <div className={styles.viewNewConversationPopup}>
        <div className={styles.viewNewConversationPopupInner}>
            <div className={styles.popupTitle1}>
                <p>New Conversation</p>
                <CloseBtn1 btnName = "Close" onClick = {() => {
                    // getConversation();
                    setTrigger(false);
                }}/>
            </div>
            
            <div className={styles.newConversationList}>
                {filteredUsers?.map((filteredUser) => {
                    return (
                        <SingleUser
                            filteredUser = {filteredUser}
                            userId= {userId}
                            getConversations = {getConversations}
                            setTrigger = {setTrigger}
                            setCurrentChat ={setCurrentChat}
                        />
                    );
                })   
                }
            </div>
        </div>
    </div>
  ) : "";
}
//=============================================================
export function SingleUser(props) {
    const {
        getConversations,
        filteredUser,
        userId,
        setTrigger,
        setCurrentChat
    } = props;

    //===============================================
    const handleOnClick = async(e) => {
        e.preventDefault()
        console.log("> handleOnClick initiated");
        try {
            const {data} = await axios.post("/postConversation", {
                senderId: userId,
                receiverId: filteredUser._id
            });
            setTrigger(false);
            getConversations();
            setCurrentChat(data)
            console.log("> handleOnClick ended");
        } catch (error) {
            console.log(error);
            console.log("> handleOnClick ended");
        }
    }
    //===============================================
    return (
    <div className={styles.singleUserConversations}>
        <span>{filteredUser.fullName}</span>
        <button onClick={handleOnClick}>New Chat</button>
    </div>
  );
}

