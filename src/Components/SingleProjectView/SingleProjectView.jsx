import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import {CommentsPopUp, ProjectUsersPopUp} from "../UtilizeComponents/PopUps.jsx";
import {dateFormat1} from "../../Functions/Conversion";
import styles from "../ComponentCSS/Layout.module.css";
import {userRoleDividerCP, projectOwnerFilter, prevUserRoleDividerCP} from "../../Functions/Conversion";

export default function SingleProjectView (props) {
  const {
    _id,
    projectName,
    startDate,
    dueDate,
    projectState, 
    comments,
    tasks,
    assignedTo
  } = props.project;

  const {
    setActivity, 
    setCurrentProject,
    user,
    users
  } = useContext(UserContext);

  //Popup useStates
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);

  const projectDeleter = user.id;
  const fStartDate = dateFormat1(startDate);
  const fDueDate = dateFormat1(dueDate);

  //===========================Functions
  const viewProject = async (e) => {
    setCurrentProject(
      {project: props.project}
    );
    setActivity("project-content-view");
  }

  const projectModify = async (e) => {
    setCurrentProject(
      {project: props.project}
    );
    setActivity("project-modify");
  }

  const deleteProject = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `/deleteTheProject/${_id}`, 
        {
          projectDeleter
        }
      );

      if(data.error){
        console.log(data.error);
      }else{
        console.log("Project Deleted");
      }

    } catch (error) {
      console.log("Project didn't deleted");
    }
  }

  //If modify protect changes this must change as well
  const changeState = async (e) => {
    e.preventDefault();

    if(e.target.value === ""){
      return ("No need to change");
    }else{
      const project = {projectState: e.target.value};

      try {
        const {data} = await axios.put(`modifyTheProject/${projectName}`,{
          user,
          project
        });
        if(data.error){
          console.log(data.error);
        }else{
          console.log(`Project State Changed from pro ${projectState} to ${project.projectState}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  //===========================End of functions

  return (
    <div className={styles.spLayout}>
      <div className={styles.descriptionLayout1}>
        <BigH pn =  {projectName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {projectState}/>
        <OB c = "Add Comment" f = {() => setTrigger1(true)}/>
        <OB c = "Add Task" f = {() => {
          const selectedUsers = assignedTo?.map((singleAssignedTo) => {
            const singleUser = users?.filter((selectedsingleUser) => {
              return (selectedsingleUser._id === singleAssignedTo.id);
            });
            return singleUser[0];
          });
          
          const assignedUsers = selectedUsers?.map((singleUser) => {
            const role = assignedTo?.filter((singleAssignedTo) => {
              return singleAssignedTo.id === singleUser._id;
            });
            console.log(role);
            return ({
              id: singleUser._id,
              role: role[0].role,
              email: singleUser.email
            });
          });
          
          setCurrentProject({
            currentProjectOwner: user,
            currentProjectName: projectName,
            dueDate: dueDate,
            oldTasks: tasks,
            assignedTo: assignedUsers
          });
          setActivity("create-new-task")
        }}/>

        <CommentsPopUp 
          trigger = {trigger1} 
          setTrigger = {setTrigger1}
          user = {user}
          projectName = {projectName}
          pastComments = {comments}
        />
      </div>
      

      <div className={styles.functionLayout1}>
        <div className={styles.functionButtonLayout1}>
          <OB c = "Modify" f = {projectModify}/>
          <OB c = "View" f = {viewProject}/>
          <OB c = "Remove" f = {deleteProject}/>
          <OB c = "Users" f = {(e) => setTrigger2(true)}/> 
          <ProjectUsersPopUp trigger = {trigger2} setTrigger = {setTrigger2} selectedProject = {props.project}/>  
        </div>
        
        <div className={styles.projectStateSelector}>
          <select 
            name = "projectState" 
            id = "projectState" 
            onChange={changeState}
            defaultValue=""
          >
            <option value="">select</option>
            <option value="completed">completed</option>
            <option value="hold">hold</option>
            <option value="dismissed">dismissed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
