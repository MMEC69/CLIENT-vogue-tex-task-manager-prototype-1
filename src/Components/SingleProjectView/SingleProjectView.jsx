import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import {Radio1} from "../UtilizeComponents/fC";
import {CommentsPopUp} from "../UtilizeComponents/PopUps.jsx";
import {dateFormat1} from "../../Functions/Conversion";
import Styles1 from "../ComponentCSS/Layout.module.css";

export default function SingleProjectView ({project}) {
  const {
    projectName,
    startDate,
    dueDate,
    projectState
  } = project;

  const {
    setActivity, 
    setCurrentProject,
    user
  } = useContext(UserContext);

  const [commentPopUp, setCommentPopUp] = useState(false);

  const projectDeleter = user.email;
  const fStartDate = dateFormat1(startDate);
  const fDueDate = dateFormat1(dueDate);

  const projectStateOptions = [
    {name: "prjectState", state: "on going"},
    {name: "prjectState", state: "completed"},
    {name: "prjectState", state: "due"}
  ]

  //===========================Functions
  const viewProject = async (e) => {
    setCurrentProject(
      {project: project}
    );
    setActivity("project-content-view");
  }

  const projectModify = async (e) => {
    setCurrentProject(
      {project: project}
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

  const changeState = async (e) => {
    e.preventDefault();
  }

  //===========================End of functions

  return (
    <div className={Styles1.spLayout}>
      <div>
        <BigH pn =  {projectName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {projectState}/>
        <OB c = "Add Comment" f = {(e) => setCommentPopUp(true)}/>
        <CommentsPopUp trigger = {commentPopUp} setTrigger = {setCommentPopUp}/>
      </div>
      

      <div className={Styles1.functionButtonLayout}>
        <div>
          <OB c = "Modify" f = {projectModify}/>
          <OB c = "View" f = {viewProject}/>
          <OB c = "Remove" f = {deleteProject}/>  
        </div>
        
        <div className={Styles1.projectStateSelector}>
          {
            projectStateOptions.map((projectStateOption) => {
              const {
                name,
                state
              } = projectStateOption;
              return <Radio1
                labelName = {state}
                name = {name}
                value = {state}
                checked = {state === projectStateOption.state}
                id = {projectName+name+state}
                onChange = {(e) => changeState}
              />
            })
          }
        </div>
      </div>

      
    </div>
  );
}
