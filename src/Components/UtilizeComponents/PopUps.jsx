import React from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import { ProfileImage1, SingleComment1, CommentInput1, CloseBtn1 } from "./PopUpsU";
import {OB, BigH, BigHG} from "../UtilizeComponents/spC";
export function CommentsPopUp(props) {

  return (props.trigger) ? (
    <div className = {styles1.viewComment}>
        <div className={styles1.viewCommentInner}>

            <div className={styles1.popupTitle1}>
            <p>Project Name</p>
            <CloseBtn1 btnName = "Close" onClick = {(e) => props.setTrigger(false)}/>
            </div>

            <div className={styles1.commentList1}>
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

export function ProjectUsersPopUp(props) {
  const {selectedProject} = props;
  const {
    projectName,
    assignedTo
  } = selectedProject;
  return (props.trigger) ? (
    <div className={styles1.viewProjectUsers}>
      <div className={styles1.viewProjectUsersInner}>
        <div className = {styles1.popupTitle1}>
          <p>{projectName} - Assgined users</p>
          <CloseBtn1 btnName = "Close" onClick = {(e) => props.setTrigger(false)}/>
        </div>
        <div className={styles1.projectUserList}>
          {
            assignedTo.map((singleUser) => {
              return(
                <SingleProjectUser1 
                  singleUser = {singleUser} 
                />
              );
            })
          }
          
        </div>
      </div>
    </div>
  ) : "";
}

export function SingleProjectUser1(props){
  const {singleUser} = props;
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

