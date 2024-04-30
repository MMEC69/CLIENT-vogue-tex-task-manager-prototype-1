import React, { useContext } from 'react'
import "./SingleProjectView.css";
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import {dateFormat1} from "../../Functions/Conversion";

export default function SingleProjectView ({project}) {
  const {
    projectOwner,
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

  const projectDeleter = user.email;
  const fStartDate = dateFormat1(startDate);
  const fDueDate = dateFormat1(dueDate);

  //===========================Functions
  const viewProject = async (e) => {
    setCurrentProject({
      currentProjectOwner : projectOwner,
      currentProjectName : projectName
    });
    setActivity("project-content-view");
  }

  const projectModify = async (e) => {
    setCurrentProject({
      currentProjectOwner : projectOwner,
      currentProjectName : projectName
    });
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
  //===========================End of functions

  return (
    <div className='single-project'>
      <div>
        <BigH pn =  {projectName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {projectState}/>
      </div>

      <div>
        <OB c = "Modify" f = {projectModify}/>
        <OB c = "View" f = {viewProject}/>
        <OB c = "Remove" f = {deleteProject}/>  
      </div>
    </div>
  );
}
