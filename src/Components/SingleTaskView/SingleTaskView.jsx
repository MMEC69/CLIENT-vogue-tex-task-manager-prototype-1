import React, { useContext } from 'react'
import { dateFormat1 } from "../../Functions/Conversion";
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import {Radio1} from "../UtilizeComponents/fC";
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
  

  const taskDeleter = user.email;
  const fStartDate = dateFormat1(newTaskStartDate);
  const fDueDate = dateFormat1(newTaskdueDate);

  const projectStateOptions = [
    {name: "taskState", state: "on going"},
    {name: "taskState", state: "completed"},
    {name: "taskState", state: "due"}
  ]

  const viewTask = async (e) => {
    setCurrentProject(
      {singleTask: singleTask}
    );
    setActivity("project-content-view");
  }

  const taskModify = async (e) => {
    setCurrentProject(
      {singleTask: singleTask}
    );
    setActivity("project-modify");
  }

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      //To send req.body, put used instead of delete
      const {data} = await axios.put(
        `/deleteTheTask/${newTaskName}`, 
        {
          data: taskDeleter
        }
      );

      if(data.error){
        console.log(data.error);
        // return toast.error(data.error);
      }else{
        console.log("Task Deleted");
        // return toast.success("Project Deleted");
      }

    } catch (error) {
      console.log("Task didn't delete");
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
        <BigH pn =  {newTaskName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {taskState}/>
      </div>

      <div className={Styles1.functionButtonLayout}>
        <div>
          <OB c = "Modify" f = {taskModify}/>
          <OB c = "View" f = {viewTask}/>
          <OB c = "Remove" f = {deleteTask}/>  
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
                id = {newTaskName+name+state}
                onChange = {(e) => changeState}
              />
            })
          }
        </div>
      </div>

      
    </div>
  );
}
