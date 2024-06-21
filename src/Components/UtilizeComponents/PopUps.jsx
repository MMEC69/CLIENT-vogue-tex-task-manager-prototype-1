import React, { useContext, useState } from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import { ProfileImage1, SingleComment1, CommentInput1, CloseBtn1, SingleProjectUser1} from "./PopUpsU";
import axios from 'axios';
import { Field1, Field2, DField1, SubmitBtn1} from '../UtilizeComponents/fC';
import { UserContext } from '../../Context/UserContex';
import { getProjects } from '../../Functions/ServerCommunication';

export function CommentsPopUp(props) {
  const {
    user,
    projectID,
    pastComments,
    projectName,
    commentUpdate
  } = props;

  const {
    setDisplayProjects
  } = useContext(UserContext);

  const [comment, setComment] = useState({
    commentor:user.fullName,
    msg:"",
    projectID:projectID,
    commentedDateTime:""
  });

  
// commentSubmit====================================/
  const commentSubmit = async (e) => {
    e.preventDefault();
    console.log("> commentSubmit initiated");
    const {
      msg
    } = comment;

    if(!msg){
      console.log("> msg is null");
      console.log("> commentSubmit ended");
      return "msg is null"
    }

    try {
      const {data} = await axios.put(`/addComment/${projectID}`,{
        commentor: user.id,
        msg,
        commentedDateTime: new Date()
      });
      if(data.error){
        console.log(data.error);
        console.log("> commentSubmit ended");
        return data.error;
      }else{
        setComment({});
        commentUpdate();
        console.log("> commentSubmit ended");
        return "Success"
      }
    } catch (error) {
      console.log(error);
      console.log("> commentSubmit ended");
      return error;
    }
  }

  return (props.trigger) ? (
    <div className = {styles1.viewComment}>
        <div className={styles1.viewCommentInner}>

            <div className={styles1.popupTitle1}>
              <p>Project - {projectName}</p>
              <CloseBtn1 btnName = "Close" onClick = {() => {
                getProjects(setDisplayProjects);
                props.setTrigger(false);
              }}/>
            </div>

            <div className={styles1.commentList1}>
              { 
                pastComments?.map((pastComment) => {
                  return (<div className={styles1.comment1}>
                  <ProfileImage1 />
                  <SingleComment1
                    msg = {pastComment.commentMessage}
                    date = {pastComment.commentedDateTime}
                  />
                </div>);
                })
              }
            </div>
            <CommentInput1
              onChangeInputField = {(inputMessage) => {setComment({...comment, msg: inputMessage})}}
              onSubmit = {commentSubmit}
            />
            
        </div>
    </div>
  ) : "";
}
// ===================================================
export function ProjectUsersPopUp(props) {
  const {selectedProject} = props;
  const {
    projectName,
    assignedTo
  } = selectedProject;

  const {
    users
  } = useContext(UserContext);

  return (props.trigger) ? (
    <div className={styles1.viewProjectUsers}>
      <div className={styles1.viewProjectUsersInner}>
        <div className = {styles1.popupTitle1}>
          <p>{projectName} - Assgined users</p>
          <CloseBtn1 btnName = "Close" onClick = {() => props.setTrigger(false)}/>
        </div>
        <div className={styles1.projectUserList}>
          {
            assignedTo?.map((selectedUser) => {
              return(
                <SingleProjectUser1 
                  selectedUser = {selectedUser} 
                />
              );
            })
          }
          
        </div>
      </div>
    </div>
  ) : "";
}
// ===================================================
export function TaskViewPopUp(props){
  const {
    trigger,
    setTrigger,
    task
  } = props;
  const {
    assigner,
    assignedProject,
    newTaskName,
    newTaskDescription,
    newTaskStartDate,
    newTaskDueDate,
    newTaskAssignedTo,
    taskState
  } = task;
  
  return(trigger) ?(
    <div className={styles1.viewTask1}>
      <div className={styles1.viewTaskInner1}>
        <div className={styles1.popupTitle1}>
          <p>Project - {assignedProject} || Task - {newTaskName}</p>
          <CloseBtn1 btnName = "Close" onClick = {(e) => setTrigger(false)}/>
        </div>
        <div className={styles1.viewTaskForm}>
          <form>
              <Field1
                  labelName = "Assigner"
                  type = "text"
                  autoComplete='off'
                  name = "assigner"
                  value={assigner}
              />
              <Field1
                  labelName = "Task Name"
                  type = "text"
                  autoComplete='off'
                  name = "taskName"
                  value={newTaskName}
              />
              <Field2
                  labelName = "Task Description"
                  type = "text"
                  autoComplete='off'
                  name = "taskDescription"
                  value={newTaskDescription}
              />
              <Field1
                  labelName = "Start Date"
                  type = "text"
                  autoComplete='off'
                  name = "taskStartDate"
                  value={newTaskStartDate}
              />
              <Field1
                  labelName = "Due Date"
                  type = "text"
                  autoComplete='off'
                  name = "dueDate"
                  value={newTaskDueDate}
              />
              <Field1
                  labelName = "Assigned To"
                  type = "text"
                  autoComplete='off'
                  name = "assignedTo"
                  value={newTaskAssignedTo}
              />
              <Field1
                  labelName = "State"
                  type = "text"
                  autoComplete='off'
                  name = "state"
                  value={taskState}
              />
          </form>
        </div>
      </div>
    </div>
  ) : "";
} 
// =======================================================
export function TaskModifyPopUp(props){
  const [taskModification, setTaskModification] = useState({});
  const {
    trigger,
    setTrigger,
    task,
    project,
    projectID,
    user
  } = props;

  // ====================================
  const taskModify = async (e) => {
    e.preventDefault();
    console.log("> taskModify initiated");
    try {
      const {data} = await axios.put(`/modifyTask/${projectID}`, {
        taskID: task._id,
        userID: user.id,
        taskModification
      });
      if(data.error){
        console.log(data.error);
        console.log("> taskModify ended");
      }else{
        setTaskModification({});
      }
    } catch (error) {
      console.log(error);
      console.log("> taskModify ended");
    }
  } 
  return(trigger) ? (
    <div className={styles1.viewTask1}>
      <div className={styles1.viewTaskInner1}>
        <div className={styles1.popupTitle1}>
          <p>Project - {project.projectName} || Task - {task.newTaskName}</p>
          <CloseBtn1 btnName = "Close" onClick = {() => setTrigger(false)}/>
        </div>
        <div className={styles1.viewTaskForm}>
          <form onSubmit={taskModify}>
              <Field1
                  labelName = "Assigner"
                  type = "text"
                  autoComplete='off'
                  name = "assigner"
                  value={task.assigner}
              />
              <Field1
                  labelName = "Task Name"
                  type = "text"
                  placeholder={task.newTaskName}
                  autoComplete='off'
                  name = "taskName"
                  value={taskModification.newTaskName}
                  onChange = {(e) => {setTaskModification({...taskModification, newTaskName: e.target.value})}}
              />
              <Field2
                  labelName = "Task Description"
                  type = "text"
                  placeholder = {task.newTaskDescription}
                  autoComplete='off'
                  name = "taskDescription"
                  value={taskModification.newTaskDescription}
                  onChange = {(e) => {setTaskModification({...taskModification, newTaskDescription: e.target.value})}}
              />
              <DField1
                    labelName = "Start Date"
                    placeholder = {task.newTaskStartDate}
                    value = {taskModification.newTaskStartDate}
                    min = {task.newTaskStartDate}
                    max = {project.dueDate}
                    onChange = {(e) => {setTaskModification({...taskModification, newTaskStartDate: e.target.value})}}
                />
              <DField1
                  labelName = "Due Date"
                  placeholder={task.newTaskDueDate}
                  value = {taskModification.newTaskDueDate}
                  min = {project.startDate}
                  onChange={(e) => {setTaskModification({...taskModification, newTaskdueDate: e.target.value})}}
              />
              <SubmitBtn1
                    buttonName = "Complete The Changes"
                    type = "submit"
              />
          </form>
        </div>
      </div>
    </div>
  ) : "";
} 


