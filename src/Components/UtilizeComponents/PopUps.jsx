import React, { useState } from 'react';
import styles1 from "../ComponentCSS/Popup.module.css";
import { ProfileImage1, SingleComment1, CommentInput1, CloseBtn1, SingleProjectUser1} from "./PopUpsU";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Field1, Field2, DField1, SubmitBtn1} from '../UtilizeComponents/fC';

export function CommentsPopUp(props) {
  const {
    user,
    projectName,
    pastComments
  } = props;

  const [comment, setComment] = useState({
    commentor:"",
    msg:"",
    projectName:"",
    commentedDateTime:""
  });

  const currentDateTime = new Date();
// commentSubmit====================================/
  const commentSubmit = async (e) => {
    e.preventDefault();

    const {
      commentor,
      msg,
      projectName,
      commentedDateTime,
    } = comment

    try {
      const {data} = await axios.put(`/addComment/${projectName}`,{
        commentor,
        msg,
        commentedDateTime
      });
      if(data.error){
        console.log(data.error);
        // toast.error(data.error);
      }else{
        setComment({
          commentor:"",
          msg:"",
          projectName:"",
          commentedDateTime:""
        });
        console.log("Commented");
        toast.success("Commented");
      }
    } catch (error) {
      console.log("Didnt post!\nErrorCode"+error);
    }
  }

  return (props.trigger) ? (
    <div className = {styles1.viewComment}>
        <div className={styles1.viewCommentInner}>

            <div className={styles1.popupTitle1}>
              <p>Project - {projectName}</p>
              <CloseBtn1 btnName = "Close" onClick = {() => props.setTrigger(false)}/>
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
              onChangeInputField = {(e) => {setComment({...comment, msg: e.target.value})}}
              value = {comment.msg}
              onClickButton = {(e) => {setComment({
                ...comment,
                commentor: user,
                projectName: projectName,
                commentedDateTime: currentDateTime
              })}}
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
    user
  } = props;

  const prevTaskName = task.newTaskName;

  // taskModify====================================/
  const taskModify = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/modifyTask/${project.projectName}`, {
        prevTaskName,
        user,
        taskModification
      });
      if(data.error){
        console.log(data.error);
        // toast.error(data.error);
      }else{
        setTaskModification({});
        console.log("Task Modified");
        // toast.success("Task Modified")
      }
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  } 

  return(trigger) ?(
    <div className={styles1.viewTask1}>
      <div className={styles1.viewTaskInner1}>
        <div className={styles1.popupTitle1}>
          <p>Project - {project.projectName} || Task - {task.newTaskName}</p>
          <CloseBtn1 btnName = "Close" onClick = {(e) => setTrigger(false)}/>
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


