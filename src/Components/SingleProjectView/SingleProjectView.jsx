import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import {CommentsPopUp, ProjectUsersPopUp} from "../UtilizeComponents/PopUps.jsx";
import {dateFormat1} from "../../Functions/Conversion";
import styles from "../ComponentCSS/Layout.module.css";
import { getComments } from "../../Functions/ServerCommunication.jsx";
import { getProjects } from '../../Functions/ServerCommunication';
import { 
  sendMailProjectRemoval, 
  sendMailProjectChangeState } from '../../Functions/Mail.jsx';
  

export default function SingleProjectView (props) {
  const {
    _id,
    projectName,
    startDate,
    dueDate,
    projectState, 
    tasks,
    assignedTo
  } = props.project;

  let{
    comments
  } = props.project;

  const [updatedComments, setUpdatedComments] = useState(comments);

  const {
    setActivity, 
    setCurrentProject,
    user,
    users,
    setDisplayProjects
  } = useContext(UserContext);

  const {
    id
  } = user;

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
    console.log("> deleteProject initiated");
    try {
      const {data} = await axios.put(
        `/deleteTheProject/${_id}`, 
        {
          projectDeleter
        }
      );
      if(data.error){
        console.log(data.error);
        getProjects(setDisplayProjects);
        console.log("> deleteProject ended");
      }else{
        getProjects(setDisplayProjects);
        try {
          const result = await sendMailProjectRemoval(projectName, projectDeleter, assignedTo, users);
          console.log(result);
        } catch (error) {
          console.log("> Error Occured when mailing");
          console.log(error);
        }
        console.log("> deleteProject ended");
      }
    } catch (error) {
      console.log(error);
      getProjects(setDisplayProjects);
      console.log("> deleteProject ended");
    }
  }

  //If modify protect changes this must change as well
  const changeState = async (e) => {
    e.preventDefault();
    const prevState = projectState;
    console.log("> changeState initited");
    if(e.target.value === ""){
      console.log("> changeState ended");
      return ("No need to change");
    }else{
      const postState = e.target.value;
      const project = {projectState: e.target.value};
      try {
        const {data} = await axios.put(`modifyTheProject/${_id}`,{
          id,
          project
        });
        const projectStateChanger = user;
        if(data.error){
          getProjects(setDisplayProjects);
          console.log(data.error);
          console.log("> changeState ended");
        }else{
          getProjects(setDisplayProjects);
          const result = await sendMailProjectChangeState(projectName, projectStateChanger, prevState, postState, assignedTo, users);
          console.log(result);
          console.log("> changeState ended");
        }
      } catch (error) {
        console.log(error);
        getProjects(setDisplayProjects);
        console.log("> changeState ended");
      }
    }
  }

  const commentUpdate = async () => {
    let updatedComments = await getComments(_id);
    updatedComments = updatedComments.comments;
    setUpdatedComments(updatedComments);
    setTrigger1(true);
  }
  //===========================End of functions
  return (
    <div className={styles.spLayout}>
      <div className={styles.descriptionLayout1}>
        <BigH pn =  {projectName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        
        <LH s = {projectState}/>
        
        <OB c = "Add Comment" f = {commentUpdate}
        />
        
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
            assignedTo: assignedUsers,
            projectID: _id
          });
          setActivity("create-new-task");
        }}/>

        <CommentsPopUp 
          trigger = {trigger1} 
          setTrigger = {setTrigger1}
          user = {user}
          projectName = {projectName}
          projectID = {_id}
          pastComments = {updatedComments}
          commentUpdate = {commentUpdate}
        />
      </div>
      

      <div className={styles.functionLayout1}>
        <div className={styles.functionButtonLayout1}>
          <OB c = "Modify" f = {projectModify}/>
          <OB c = "View" f = {viewProject}/>
          <OB c = "Remove" f = {deleteProject}/>
          <OB c = "Users" f = {() => {setTrigger2(true)}}/> 
          <ProjectUsersPopUp 
            trigger = {trigger2} 
            setTrigger = {setTrigger2} 
            selectedProject = {props.project}
          />  
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
