import React from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import { OB } from './spC';
import { ProfileImage1, SingleComment1, CommentInput1 } from "./PopUpsU";

export function CommentsPopUp(props) {

  return (props.trigger) ? (
    <div className = {styles1.viewComment}>
        <div className={styles1.viewCommentInner}>
            <OB c = "go back" f = {(e) => props.setTrigger(false)}/>
            <div className={styles1.commentList1}>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
              <div className={styles1.comment1}>
                <ProfileImage1 />
                <SingleComment1
                  msg = "This is a sample message"
                  date = "2024-12-12, 16:16"
                />
              </div>
            </div>
            <CommentInput1/>
            
        </div>
    </div>
  ) : "";
}
