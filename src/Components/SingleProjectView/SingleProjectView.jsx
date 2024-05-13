import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import {CommentsPopUp, ProjectUsersPopUp} from "../UtilizeComponents/PopUps.jsx";
import {dateFormat1} from "../../Functions/Conversion";
import Styles1 from "../ComponentCSS/Layout.module.css";
import { options } from '../../MetaData/MetaData.jsx';

export default function SingleProjectView (props) {
  const selectedProject = props.project;
  const {
    projectName,
    startDate,
    dueDate,
    projectState, 
    comments
  } = selectedProject;

  const {
    setActivity, 
    setCurrentProject,
    user,
  } = useContext(UserContext);

  //Popup useStates
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);

  const projectDeleter = user.email;
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
      //To send req.body, put used instead of delete
      const {data} = await axios.put(
        `/deleteTheProject/${projectName}`, 
        {
          data: projectDeleter
        }
      );

      if(data.error){
        console.log(data.error);
        // return toast.error(data.error);
      }else{
        console.log("Project Deleted");
        // return toast.success("Project Deleted");
      }

    } catch (error) {
      console.log("Project didn't deleted");
      // return toast.error(error);
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
          console.log("Didn't Post/nError Code: "+data.error);
        }else{
          console.log(`Project State Changed from pro ${projectState} to ${project.projectState}`)
        }
      } catch (error) {
        console.log(`Unexpected error\nError code: ${error}`);
      }
    }
  }
  //===========================End of functions

  return (
    <div className={Styles1.spLayout}>
      <div>
        <BigH pn =  {projectName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {projectState}/>
        <OB c = "Add Comment" f = {(e) => setTrigger1(true)}/>
        <CommentsPopUp 
          trigger = {trigger1} 
          setTrigger = {setTrigger1}
          user = {user}
          projectName = {projectName}
          pastComments = {comments}
        />
      </div>
      

      <div className={Styles1.functionButtonLayout}>
        <div>
          <OB c = "Modify" f = {projectModify}/>
          <OB c = "View" f = {viewProject}/>
          <OB c = "Remove" f = {deleteProject}/>
          <OB c = "Users" f = {(e) => setTrigger2(true)}/> 
          <ProjectUsersPopUp trigger = {trigger2} setTrigger = {setTrigger2} selectedProject = {selectedProject}/>  
        </div>
        
        <div className={Styles1.projectStateSelector}>
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
