import React, { useContext, useState } from 'react'
import { dateFormat1 } from "../../Functions/Conversion";
import {BigH, MidH, LH, OB} from "../UtilizeComponents/spC";
import { TaskViewPopUp, TaskModifyPopUp } from '../UtilizeComponents/PopUps';
import Styles1 from "../ComponentCSS/Layout.module.css";
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';

export default function SingleTaskView({singleTask, project}) {
  const {
    _id,
    assignedProject,
    newTaskName,
    newTaskStartDate,
    newTaskdueDate,
    taskState
  } = singleTask;
  
  const {
    user
  } = useContext(UserContext)
  
  //popup triggers
  const [trigger1, setTrigger1] = useState(false);
  const [trigger2, setTrigger2] = useState(false);

  const fStartDate = dateFormat1(newTaskStartDate);
  const fDueDate = dateFormat1(newTaskdueDate);

  const deleteTask = async (e) => {
    e.preventDefault();
    const {
      id
    } = user;
    const taskID = _id;
    try {
      const {data} = await axios.put(
        `/deleteTheTask/${project.projectName}`, 
        {
          id,
          taskID
        }
      );
      if(data.error){
        console.log(`Didn't post delete\n${data.error}`);
      }else{
        console.log(data);
      }
    } catch (error) {
      console.log(`Unexpected error\nError code: ${error}`);
    }
  }
  const changeState = async (e) => {
    e.preventDefault();
    console.log("> changeState initiated");
    if(e.target.value === ""){
      return ("No need to change");
    }else{
      const task = {
        taskID: _id, 
        taskState: e.target.value
      };

      try {
        const {data} = await axios.put(`modifyTheTaskState/${project._id}`,{
          userID: user.id,
          task: task
        });
        if(data.error){
          console.log(data.error);
          console.log("> changeState ended");
        }else{
          console.log("> changeState ended");
        }
      } catch (error) {
        console.log(error);
        console.log("> changeState ended");
      }
    }
  }  
//===========================End of functions
  return (
    <div className={Styles1.spLayout}>
      <div className={Styles1.descriptionLayout1}>
        <BigH pn =  {newTaskName}/>
        <MidH sd =  {fStartDate} dd = {fDueDate}/>
        <LH s = {taskState}/>
      </div>

      <div className={Styles1.functionButtonLayout}>
        <OB c = "Modify" f = {() => {setTrigger2(true)}}/>
        <OB c = "View" f = {() => {setTrigger1(true)}}/>
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
