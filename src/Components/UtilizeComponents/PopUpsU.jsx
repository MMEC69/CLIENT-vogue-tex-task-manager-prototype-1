import React from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import sampleProfileImage from "../Assests/profile-icon-design-free-vector.jpg";

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
        onChangeButton
    } = props;
    return (
      <div className={styles1.commentInput1}>
          <input
            type='text'
            placeholder='Write your comment here...'
            onChange={onChangeInputField}
          />
          <button onChange={onChangeButton}>
            Send
          </button>
      </div>
    )
  }
