import React, { useContext, useState } from 'react'
import { dateFormat1 } from "../../Functions/Conversion";
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import { TaskViewPopUp, TaskModifyPopUp } from '../UtilizeComponents/PopUps';
import Styles1 from "../ComponentCSS/Layout.module.css";
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';

export default function SingleTaskView({singleTask, project}) {
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
  const [trigger2, setTrigger2] = useState(false);

  const fStartDate = dateFormat1(newTaskStartDate);
  const fDueDate = dateFormat1(newTaskdueDate);

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
  //If modify protect changes this must change as well
  const changeState = async (e) => {
    e.preventDefault();

    if(e.target.value === ""){
      return ("No need to change");
    }else{
      const task = {
        taskName: newTaskName, 
        taskState: e.target.value
      };

      try {
        const {data} = await axios.put(`modifyTheTaskState/${assignedProject}`,{
          user,
          task
        });
        if(data.error){
          console.log("Didn't Post/nError Code: "+data.error);
        }else{
          console.log(`Task State changed`)
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
        <BigH pn =  {newTaskName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {taskState}/>
      </div>

      <div className={Styles1.functionButtonLayout}>
          <OB c = "Modify" f = {(e) => {setTrigger2(true)}}/>
          <OB c = "View" f = {(e) => {setTrigger1(true)}}/>
          <OB c = "Remove" f = {deleteTask}/>  
          <div className={Styles1.projectStateSelector}>
          <select 
            name = "taskState" 
            id = "taskState" 
            onChange={changeState}
            defaultValue=""
          >
            <option value="">select</option>
            <option value="completed">completed</option>
            <option value="hold">hold</option>
            <option value="dismissed">dismissed</option>
          </select>
        </div>
          <TaskViewPopUp
            trigger = {trigger1}
            setTrigger= {setTrigger1}
            task = {singleTask}
          />
          <TaskModifyPopUp
            trigger = {trigger2}
            setTrigger = {setTrigger2}
            task = {singleTask}
            project = {project}
            user = {user}
          />
      </div>
      
    </div>
  );
}
