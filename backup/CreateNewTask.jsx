import React, { useEffect } from 'react';
import "./CreateNewTask.css";
import SingleTaskView from '../SingleTaskView/SingleTaskView';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { registerLicense } from '@syncfusion/ej2-base';
import Select from "react-dropdown-select"; 
import { Field1, Field2, DField1, MSField1, SSField1, SubmitBtn1 } from '../UtilizeComponents/fC';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0TXxbf1x0ZFREalxUTnJWUj0eQnxTdEFjXX1fcXZVQ2RVWEN/Ww==');

export default function CreateNewTask() {
    const {
        users,
        user,
        displayProjects, 
        newTask, 
        setNewTask, 
        tasks, 
        setTasks, 
        setActivity, 
        currentProject, 
        setCurrentProject} = useContext(UserContext);

    const InitialStartDate = new Date();
    const endDate = currentProject.dueDate;
    
    const addNewTask = async (e) => {
        e.preventDefault();
        if (newTask.tastState === undefined || newTask.tastState === ""){
            newTask.tastState = "On going";
        }
        setTasks ([newTask, ...tasks]);
        setNewTask ({assginer:currentProject.currentProjectOwner, assignedProject: currentProject.currentProjectName});
    }

    const completeProject = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put("/createNewTask", {
                currentProject, tasks
            });
            if(data.error){
                toast.error(data.error);
            }else{
                setCurrentProject({});
                toast.success("Project Completed!");
                setActivity("dashboard");
            }
        } catch (error) {
            console.log("Error:" +error);
        }
    }

    return (
        <div className='create-new-task'>
            <form onSubmit={addNewTask}>
                <Field1
                    labelName = "Project Name"
                    type = "text"
                    placeholder=''
                    autoComplete='off'
                    name = "assginedProject"
                    value={currentProject.currentProjectName}
                    onBlur={(e) => {
                        setNewTask({
                            ...currentProject, 
                            currentProjectName: e.target.value, 
                            currentProjectOwner: currentProject.currentProjectOwner});
                        }
                    }                
                />
                <div className='field-P'>
                <label>Project Name:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "assginedProject"
                    value={currentProject.currentProjectName}
                    onBlur={(e) => {
                        setNewTask({
                            ...currentProject, 
                            currentProjectName: e.target.value, 
                            currentProjectOwner: currentProject.currentProjectOwner});
                        }
                    }
                />  
            </div>
            <div className='field-P'>
                <label>Task Name:</label> 
                <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskName"
                    value={newTask.newTaskName}
                    onChange={(e) => {setNewTask({...newTask, newTaskName: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Task Description:</label> 
                <textarea 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "newTaskDescription"
                    value={newTask.newTaskDescription}
                    onChange={(e) => {setNewTask({...newTask, newTaskDescription: e.target.value})}}
                /> 
            </div>

            <div className='field-P'>
                <label>Start Date:</label> 
                <DatePickerComponent 
                    onChange={(e) => {setNewTask({...newTask, newTaskStartDate: e.target.value})}}
                    value = {newTask.newTaskStartDate}
                    placeholder='Enter Date'
                    min={InitialStartDate}
                    max={endDate}
                    >
                </DatePickerComponent>
                {/* <input 
                    type='date'
                    placeholder=''
                    autoComplete='off'
                    name = "startDate"
                    value={newTask.newTaskStartDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskStartDate: e.target.value})}}
                />  */}
            </div>

            <div className='field-P'>
                <label>Due Date:</label> 
                <DatePickerComponent 
                    onChange={(e) => {setNewTask({...newTask, newTaskdueDate: e.target.value})}}
                    placeholder='Enter Date'
                    value={newTask.newTaskdueDate}
                    min={newTask.newTaskStartDate}
                    max={endDate}
                    >
                </DatePickerComponent>
                {/* <input 
                    type='date'
                    placeholder=''
                    autoComplete='off'
                    name = "dueDate"
                    value={newTask.newTaskdueDate}
                    onChange={(e) => {setNewTask({...newTask, newTaskdueDate: e.target.value})}}
                />  */}
            </div>

            <div className='field-P'>
                <label>Assigned To:</label> 
                <Select
                    name = "users"
                    options = {users}
                    labelField="email"
                    valueField='email'
                    multi
                    searchable = "true"
                    onChange={(e) => {setNewTask({...newTask, newTaskAssignedTo: e})}}
                >
                </Select>
                {/* <input 
                    type='text'
                    placeholder=''
                    autoComplete='off'
                    name = "assignedTo"
                    value={newTask.newTaskAssignedTo}
                    onChange={(e) => {setNewTask({...newTask, newTaskAssignedTo: e.target.value})}}
                />  */}
            </div>


            <div className='field-P'>
                <label>State:</label> 
                <select onChange={(e) => {setNewTask({...newTask, taskState: e.target.value})}}>
                    <option value="On Going" selected>On Going</option>
                    <option value="Completed">Completed</option>    
                    <option value="Due">Due</option>    
                </select>   
            </div>

            <div className='field-P'>
                <label></label>
                <button type = "submit" onClick={(e) => setNewTask({...newTask, assginer:currentProject.currentProjectOwner, assignedProject: currentProject.currentProjectName})}>Add Task</button><br/>
                <button onClick={completeProject} id='complete-project'>Complete Project</button>
            </div>
            
            </form>

        

    <div className='task-view'>
        {tasks.map(projectTask => {
                return <SingleTaskView singleTask = {projectTask}/>
        })}
    </div>
</div>
    
    );
}
