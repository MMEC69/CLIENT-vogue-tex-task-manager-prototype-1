import React, { useContext, useState } from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import styles from "../ComponentCSS/Layout.module.css";
import sampleProfileImage from "../Assests/profile-icon-design-free-vector.jpg";
import {OB} from "../UtilizeComponents/spC";
import { UserContext } from '../../Context/UserContex';
import { Field1, Field2, DField1, SubmitBtn1, SubmitBtn3, SubmitBtn2} from '../UtilizeComponents/fC';
import axios from 'axios';

//=======================================================
export function ProfileImage1() {
  return (
    <div className={styles1.profilePicture1}>
        <img src={sampleProfileImage} alt="sampleProfileImage" />
    </div>
  )
}
//=======================================================
export function SingleComment1(props) {
    const {
        msg,
        date
    } = props;
    return (
      <div className={styles1.singleComment1}>
          <div className={styles1.msg1}>
            {msg}
          </div>
          <div className={styles1.dateTime1}>
            {date}
          </div>
      </div>
    )
}
//=======================================================
export function CommentInput1(props) {
    const {
        onChangeInputField,
        onSubmit,
    } = props;
    const [inputMessage, setInputMessage] = useState();
    const inputFieldUpdate = async(e) => {
      console.log("> inputFieldUpdate initiated");
      console.log("> comment date set");
      onChangeInputField(inputMessage);
      console.log("> comment msg set");
      setInputMessage("");
      console.log("> inputFieldUpdate ended");
    }
    return (
      <div className={styles1.commentInput1}>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Write your comment here...'
            name='comment'
            value={inputMessage}
            onChange={(e) => {setInputMessage(e.target.value)}}
          />
          <button onClick={inputFieldUpdate}>
            Send
          </button>
        </form>
      </div>
    )
  }
//=======================================================
  export function CloseBtn1(props) {
    const {
      btnName,
      onClick
    } = props;
    return (
      <div className = {styles1.closeBtn1}>
          <button onClick={onClick}>{btnName}</button>
      </div>
    );
  } 
//=======================================================
  export function SingleProjectUser1 (props){
    const {selectedUser} = props;
    let singleUser = [];
    console.log(selectedUser);
    const {users} = useContext(UserContext);
    const userDetils = users.filter((checkingUser) => {
      return checkingUser._id === selectedUser.id;
    }); 
    singleUser = userDetils[0];
    return(
      <div className={styles1.singleUser1}>
        <div className={styles1.userProfileImage1}>
          <ProfileImage1 />
          <p>{singleUser.fullName}</p>
        </div>
        {/* <div className={styles1.userInfo1}>
          <p>{singleUser.fullName}</p>
        </div> */}
        <div className={styles1.userInfo1}>
          <p>{singleUser.email}</p>
        </div>
        {/* <div className={styles1.userInfo1}>
          <p>{singleUser.role}</p>
        </div> */}
        
        {/* <div className={styles1.functions1}> 
          <div className={styles.projectStateSelector}>
            <select 
              name = "projectState" 
              id = "projectState" 
              // onChange={changeState}
              defaultValue=""
            >
              <option value="">select</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <OB c = "remove"/>
        </div> */}
      </div>
    );
  }
  //=======================================================
  export function RequestEmailContent(props) {
    const {
      tempActivity,
      setTempActivity,
      user,
      setUser,
      ticket,
      setTicket
    } = props;

    const [email, setEmail] = useState("");
    const [notify, setNotify] = useState("");

    const addTicketHandleClick = async(e) => {
      e.preventDefault();
      console.log("> addTicketHandleClick initiated");
      try {
        const {data} = await axios.post("/ticket/add", {
          email: email
        });
        if(!data){
          setEmail("");
          setNotify("Ticket failed");
        }
        setNotify("Ticket succeed");
        setUser(data.user);
        setTicket(data.ticket);
        setTempActivity("request-code");
        setEmail("");
      } catch (error) {
        setEmail("");
        setNotify("Ticket failed");
        console.log(error);
        console.log("> addTicketHandleClick ended");
      }
    }
    //request-code
    return (
      <div className={styles1.viewPasswordContent}>
        <Field1
            labelName = "Provide your registered email"
            type = "email"
            autoComplete='off'
            name = "email"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <SubmitBtn3
            buttonName = "Send the code"
            type = "submit"
            onClick = {addTicketHandleClick}
          />
          <span>{notify}</span>
      </div>
    );
  }
//=======================================================
export function RequestCodeContent(props) {
  const {
    tempActivity,
    setTempActivity,
    user,
    setUser,
    ticket,
    setTicket
  } = props;

  const [receivedSecretNumber, setReceivedSecretNumber] = useState("");
  const [notify, setNotify] = useState("");

  const checkTicketHandleClick = async(e) => {
    e.preventDefault();
    console.log("> checkTicketHandleClick initiated");
    try {
      const {data} = await axios.post("/ticket/check", {
        userId: user._id,
        ticket: ticket,
        receivedSecretNumber: receivedSecretNumber
      });
      if(!data){
        setReceivedSecretNumber("");
        setNotify("Ticket failed");
      }
      setNotify("Ticket succeed");
      setTempActivity("password-change");
      setReceivedSecretNumber("");
    } catch (error) {
      setReceivedSecretNumber("");
      setNotify("Ticket failed");
      console.log(error);
      console.log("> checkTicketHandleClick ended");
    }
  }

  return (
    <div className={styles1.viewPasswordContent}>
      <Field1
          labelName = "Provide your secret number"
          type = "text"
          autoComplete='off'
          name = "secretNumber"
          value= {receivedSecretNumber}
          onChange = {(e) => setReceivedSecretNumber(e.target.value)}
        />
        <SubmitBtn3
          buttonName = "Confirm ticket"
          type = "submit"
          onClick = {checkTicketHandleClick}
        />
        <span>{notify}</span>
    </div>
  );
}
//=======================================================
export function RequestPasswordChange(props) {
  const {
    tempActivity,
    setTempActivity,
    user,
    setUser,
    ticket,
    setTicket,
    trigger,
    setTrigger
  } = props;

  const [notify, setNotify] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePasswordHandleClick = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/modify/password", {
        ticket,
        user,
        newPassword
      });
      if(!data){
        setNewPassword("");
        setNotify("Password Change Failed");
      }else if(data.msg === "Password changed"){
        setNotify("Password changed");
        setTempActivity("request-email");
        setNewPassword("");
        setTrigger(false);
      }else{
        setNotify("Password changed failed");
        setNewPassword("");
      }
    } catch (error) {
      console.log(error);
      console.log("> changePasswordHandleClick ended");
      setNotify("Password didn't change");
    }
  }
  return (
    <div className={styles1.viewPasswordContent}>
      <Field1
          labelName = "Provide your new password"
          type = "password"
          autoComplete='off'
          name = "assigner"
          value={newPassword}
          onChange = {(e) => setNewPassword(e.target.value)}
        />
        <SubmitBtn3
          buttonName = "Change password"
          type = "submit"
          onClick = {changePasswordHandleClick}
        />
        <span>{notify}</span>
    </div>
  );
}
//=======================================================