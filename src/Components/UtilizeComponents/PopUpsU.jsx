import React, { useContext, useState } from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import sampleProfileImage from "../Assests/profile-icon-design-free-vector.jpg";
import {OB} from "../UtilizeComponents/spC";
import { UserContext } from '../../Context/UserContex';

export function ProfileImage1() {
  return (
    <div className={styles1.profilePicture1}>
        <img src={sampleProfileImage} alt="sampleProfileImage" />
    </div>
  )
}

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
        </div>
        <div className={styles1.userInfo1}>
        <p>{singleUser.email}</p>
        <p>{singleUser.fullName}</p>
        
        </div>
        <div className={styles1.userInfo1}>
          <p>{singleUser.type}</p>
        </div>
        <div className={styles1.functions1}> 
          <OB c = "type"/>
          <OB c = "remove"/>
        </div>
      </div>
    );
  }