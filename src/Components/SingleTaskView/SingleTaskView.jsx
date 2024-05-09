import React, { useContext, useState } from 'react'
import { dateFormat1 } from "../../Functions/Conversion";
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import { TaskViewPopUp } from '../UtilizeComponents/PopUps';
import Styles1 from "../ComponentCSS/Layout.module.css";
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';

export default function SingleTaskView({singleTask}) {
  const {
    assginer, 
    assignedProject,
    newTaskName,
    newTaskDescription,
    newTaskStartDate,
    newTaskdueDate,
    newTaskAssignedTo,
    taskState
  } = singleTask;
  
  const {
    setActivity,
    setCurrentProject,
    user
  } = useContext(UserContext)
  
  //popup triggers
  const [trigger1, setTrigger1] = useState(false);

  const fStartDate = dateFormat1(newTaskStartDate);
  const fDueDate = dateFormat1(newTaskdueDate);

  const taskModify = async (e) => {
    setCurrentProject(
      {singleTask: singleTask}
    );
    setActivity("project-modify");
  }

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `/deleteTheTask/${assignedProject}`, 
        {
          user,
          newTaskName
        }
      );
      if(data.error){
        console.log(`Didn't post delete\n${data.error}`);
        // return toast.error(data.error);
      }else{
        console.log(data);
        // return toast.success("Project Deleted");
      }
    } catch (error) {
      console.log(`Unexpected error\nError code: ${error}`);
      // return toast.error(error);
    }
  }
  console.log(trigger1);
  //===========================End of functions
  return (
    <div className={Styles1.spLayout}>
      <div>
        <BigH pn =  {newTaskName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {taskState}/>
      </div>

      <div className={Styles1.functionButtonLayout}>
          <OB c = "Modify" f = {taskModify}/>
          <OB c = "View" f = {(e) => {setTrigger1(true)}}/>
          <OB c = "Remove" f = {deleteTask}/>  
          <TaskViewPopUp
            trigger = {trigger1}
            setTrigger= {setTrigger1}
            task = {singleTask}
          />
      </div>
      
    </div>
  );
}
